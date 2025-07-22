import { Router } from 'express';
import { CashfreeService } from '../cashfree';
import { z } from 'zod';

const router = Router();
const cashfree = new CashfreeService();

// Payment session creation schema
const createSessionSchema = z.object({
  orderId: z.string(),
  orderAmount: z.number().min(1),
  customerName: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string(),
  orderNote: z.string().optional(),
});

// Subscription creation schema
const createSubscriptionSchema = z.object({
  planId: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  customerPhone: z.string(),
  planAmount: z.number().min(1),
});

// Create payment session
router.post('/create-session', async (req, res) => {
  try {
    const validatedData = createSessionSchema.parse(req.body);
    
    const session = await cashfree.createPaymentSession({
      ...validatedData,
      returnUrl: `${process.env.BASE_URL}/payment/success`,
      notifyUrl: `${process.env.BASE_URL}/api/cashfree/webhook`,
    });
    
    res.json({
      success: true,
      sessionId: session.payment_session_id,
      orderId: session.order_id,
      orderAmount: session.order_amount,
    });
  } catch (error) {
    console.error('Create session error:', error);
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create payment session',
    });
  }
});

// Create subscription
router.post('/create-subscription', async (req, res) => {
  try {
    const validatedData = createSubscriptionSchema.parse(req.body);
    
    // First create the plan if it doesn't exist
    const planId = `dropee_premium_${validatedData.planId}`;
    
    try {
      await cashfree.createSubscriptionPlan({
        planId,
        planName: 'Dropee Premium Plan',
        planAmount: validatedData.planAmount,
        intervalType: 'MONTH',
        intervals: 1,
        description: 'Monthly premium seller subscription for Dropee platform',
      });
    } catch (planError) {
      // Plan might already exist, continue with subscription creation
      console.log('Plan creation info:', planError);
    }
    
    // Create subscription
    const subscriptionId = `sub_${Date.now()}_${validatedData.customerEmail.replace('@', '_')}`;
    
    const subscription = await cashfree.createSubscription({
      subscriptionId,
      planId,
      customerName: validatedData.customerName,
      customerEmail: validatedData.customerEmail,
      customerPhone: validatedData.customerPhone,
    });
    
    res.json({
      success: true,
      subscriptionId: subscription.subscription_id,
      subscriptionUrl: subscription.authorization_url,
      planId,
    });
  } catch (error) {
    console.error('Create subscription error:', error);
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create subscription',
    });
  }
});

// Verify payment
router.get('/verify-payment/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const paymentStatus = await cashfree.verifyPayment(orderId);
    
    res.json({
      success: true,
      orderId: paymentStatus.order_id,
      orderStatus: paymentStatus.order_status,
      paymentStatus: paymentStatus.payment_status,
      orderAmount: paymentStatus.order_amount,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to verify payment',
    });
  }
});

// Cancel subscription
router.post('/cancel-subscription/:subscriptionId', async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    
    const result = await cashfree.cancelSubscription(subscriptionId);
    
    res.json({
      success: true,
      subscriptionId: result.subscription_id,
      status: result.subscription_status,
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to cancel subscription',
    });
  }
});

// Webhook handler for payment notifications
router.post('/webhook', async (req, res) => {
  try {
    const signature = req.headers['x-webhook-signature'] as string;
    const rawBody = JSON.stringify(req.body);
    
    // Validate webhook signature
    if (!cashfree.validateWebhookSignature(rawBody, signature)) {
      return res.status(401).json({ success: false, message: 'Invalid signature' });
    }
    
    const webhookData = req.body;
    
    // Handle different webhook events
    switch (webhookData.type) {
      case 'PAYMENT_SUCCESS':
        // Update order status in database
        console.log('Payment successful:', webhookData.data);
        // TODO: Update order status in Firestore
        break;
        
      case 'PAYMENT_FAILED':
        // Handle payment failure
        console.log('Payment failed:', webhookData.data);
        // TODO: Update order status in Firestore
        break;
        
      default:
        console.log('Unhandled webhook event:', webhookData.type);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Webhook processing failed',
    });
  }
});

// Webhook handler for subscription notifications
router.post('/subscription-webhook', async (req, res) => {
  try {
    const signature = req.headers['x-webhook-signature'] as string;
    const rawBody = JSON.stringify(req.body);
    
    // Validate webhook signature
    if (!cashfree.validateWebhookSignature(rawBody, signature)) {
      return res.status(401).json({ success: false, message: 'Invalid signature' });
    }
    
    const webhookData = req.body;
    
    // Handle subscription webhook events
    switch (webhookData.type) {
      case 'SUBSCRIPTION_ACTIVATED':
        // Activate premium features
        console.log('Subscription activated:', webhookData.data);
        // TODO: Update user premium status in Firestore
        break;
        
      case 'SUBSCRIPTION_CANCELLED':
        // Deactivate premium features
        console.log('Subscription cancelled:', webhookData.data);
        // TODO: Update user premium status in Firestore
        break;
        
      case 'SUBSCRIPTION_CHARGED':
        // Handle successful subscription payment
        console.log('Subscription charged:', webhookData.data);
        // TODO: Extend premium subscription in Firestore
        break;
        
      default:
        console.log('Unhandled subscription webhook event:', webhookData.type);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Subscription webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Subscription webhook processing failed',
    });
  }
});

export { router as cashfreeRoutes };