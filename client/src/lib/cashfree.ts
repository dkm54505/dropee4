// Cashfree Payment Integration
import { load } from "@cashfreepayments/cashfree-js";

let cashfree: any;

const initializeCashfree = async () => {
  if (!cashfree) {
    cashfree = await load({
      mode: import.meta.env.VITE_CASHFREE_MODE || "sandbox", // "sandbox" or "production"
    });
  }
  return cashfree;
};

export interface PaymentData {
  orderId: string;
  orderAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderNote?: string;
}

export interface SubscriptionData {
  planId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  planAmount: number;
}

// Create payment session for one-time payments
export const createPaymentSession = async (paymentData: PaymentData) => {
  try {
    const response = await fetch('/api/cashfree/create-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to create payment session');
    }

    return result;
  } catch (error) {
    console.error('Error creating payment session:', error);
    throw error;
  }
};

// Create subscription for premium plans
export const createSubscription = async (subscriptionData: SubscriptionData) => {
  try {
    const response = await fetch('/api/cashfree/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to create subscription');
    }

    return result;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

// Process payment using Cashfree
export const processPayment = async (sessionId: string, paymentData: PaymentData) => {
  try {
    const cashfreeInstance = await initializeCashfree();
    
    const checkoutOptions = {
      paymentSessionId: sessionId,
      redirectTarget: "_modal",
    };

    const result = await cashfreeInstance.checkout(checkoutOptions);
    
    if (result.error) {
      throw new Error(result.error.message || 'Payment failed');
    }

    return result;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

// Verify payment status
export const verifyPayment = async (orderId: string) => {
  try {
    const response = await fetch(`/api/cashfree/verify-payment/${orderId}`, {
      method: 'GET',
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to verify payment');
    }

    return result;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// Cancel subscription
export const cancelSubscription = async (subscriptionId: string) => {
  try {
    const response = await fetch(`/api/cashfree/cancel-subscription/${subscriptionId}`, {
      method: 'POST',
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to cancel subscription');
    }

    return result;
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw error;
  }
};