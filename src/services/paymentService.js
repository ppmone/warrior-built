import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY, BACKEND_URL } from '../config/stripe';

let stripePromise;

export const initializeStripe = async () => {
    if (!stripePromise) {
        stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
    }
    return stripePromise;
};

export const createCheckoutSession = async (userId, appId) => {
    if (!BACKEND_URL || BACKEND_URL === 'YOUR_BACKEND_SERVER_URL') {
        throw new Error('Backend URL not configured.');
    }

    const response = await fetch(`${BACKEND_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, appId }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create checkout session.');
    }

    return await response.json();
};