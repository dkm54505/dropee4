// Cashfree Server-side Integration
import crypto from 'crypto';

interface CashfreeConfig {
  appId: string;
  secretKey: string;
  apiVersion: string;
  baseUrl: string;
}

export class CashfreeService {
  private config: CashfreeConfig;

  constructor() {
    this.config = {
      appId: process.env.CASHFREE_APP_ID || '',
      secretKey: process.env.CASHFREE_SECRET_KEY || '',
      apiVersion: '2023-08-01',
      baseUrl: process.env.CASHFREE_MODE === 'production' 
        ? 'https://api.cashfree.com'
        : 'https://sandbox.cashfree.com'
    };
  }

  // Generate signature for API requests
  private generateSignature(postData: string): string {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const body = `${timestamp}${postData}`;
    const signature = crypto
      .createHmac('sha256', this.config.secretKey)
      .update(body)
      .digest('base64');
    
    return `${timestamp}${signature}`;
  }

  // Create payment session
  async createPaymentSession(orderData: {
    orderId: string;
    orderAmount: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    orderNote?: string;
    returnUrl?: string;
    notifyUrl?: string;
  }) {
    const postData = JSON.stringify({
      order_id: orderData.orderId,
      order_amount: orderData.orderAmount,
      order_currency: 'INR',
      customer_details: {
        customer_id: orderData.customerEmail,
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
      },
      order_meta: {
        return_url: orderData.returnUrl || `${process.env.BASE_URL}/payment/success`,
        notify_url: orderData.notifyUrl || `${process.env.BASE_URL}/api/cashfree/webhook`,
      },
      order_note: orderData.orderNote || 'Dropee Payment',
    });

    try {
      const response = await fetch(`${this.config.baseUrl}/pg/orders`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-version': this.config.apiVersion,
          'x-client-id': this.config.appId,
          'x-client-secret': this.config.secretKey,
        },
        body: postData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create payment session');
      }

      return result;
    } catch (error) {
      console.error('Cashfree API Error:', error);
      throw error;
    }
  }

  // Create subscription plan
  async createSubscriptionPlan(planData: {
    planId: string;
    planName: string;
    planAmount: number;
    intervalType: 'MONTH' | 'WEEK' | 'DAY';
    intervals: number;
    description?: string;
  }) {
    const postData = JSON.stringify({
      plan_id: planData.planId,
      plan_name: planData.planName,
      plan_type: 'ON_DEMAND',
      plan_amount: planData.planAmount,
      plan_currency: 'INR',
      interval_type: planData.intervalType,
      intervals: planData.intervals,
      plan_description: planData.description || 'Dropee Premium Plan',
    });

    try {
      const response = await fetch(`${this.config.baseUrl}/pg/plans`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-version': this.config.apiVersion,
          'x-client-id': this.config.appId,
          'x-client-secret': this.config.secretKey,
        },
        body: postData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create subscription plan');
      }

      return result;
    } catch (error) {
      console.error('Cashfree Subscription API Error:', error);
      throw error;
    }
  }

  // Create subscription
  async createSubscription(subscriptionData: {
    subscriptionId: string;
    planId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  }) {
    const postData = JSON.stringify({
      subscription_id: subscriptionData.subscriptionId,
      plan_id: subscriptionData.planId,
      customer_details: {
        customer_id: subscriptionData.customerEmail,
        customer_name: subscriptionData.customerName,
        customer_email: subscriptionData.customerEmail,
        customer_phone: subscriptionData.customerPhone,
      },
      subscription_meta: {
        return_url: `${process.env.BASE_URL}/subscription/success`,
        notify_url: `${process.env.BASE_URL}/api/cashfree/subscription-webhook`,
      },
    });

    try {
      const response = await fetch(`${this.config.baseUrl}/pg/subscriptions`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-version': this.config.apiVersion,
          'x-client-id': this.config.appId,
          'x-client-secret': this.config.secretKey,
        },
        body: postData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create subscription');
      }

      return result;
    } catch (error) {
      console.error('Cashfree Subscription Creation Error:', error);
      throw error;
    }
  }

  // Verify payment
  async verifyPayment(orderId: string) {
    try {
      const response = await fetch(`${this.config.baseUrl}/pg/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'x-api-version': this.config.apiVersion,
          'x-client-id': this.config.appId,
          'x-client-secret': this.config.secretKey,
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to verify payment');
      }

      return result;
    } catch (error) {
      console.error('Cashfree Payment Verification Error:', error);
      throw error;
    }
  }

  // Cancel subscription
  async cancelSubscription(subscriptionId: string) {
    try {
      const response = await fetch(`${this.config.baseUrl}/pg/subscriptions/${subscriptionId}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-version': this.config.apiVersion,
          'x-client-id': this.config.appId,
          'x-client-secret': this.config.secretKey,
        },
        body: JSON.stringify({
          subscription_status: 'CANCELLED',
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to cancel subscription');
      }

      return result;
    } catch (error) {
      console.error('Cashfree Subscription Cancellation Error:', error);
      throw error;
    }
  }

  // Validate webhook signature
  validateWebhookSignature(rawBody: string, signature: string): boolean {
    try {
      const expectedSignature = crypto
        .createHmac('sha256', this.config.secretKey)
        .update(rawBody)
        .digest('base64');
      
      return signature === expectedSignature;
    } catch (error) {
      console.error('Webhook signature validation error:', error);
      return false;
    }
  }
}