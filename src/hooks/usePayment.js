import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { fetchCheckoutSession } from '../services/paymentService';

const STRIPE_PUBLISHABLE_KEY = 'YOUR_STRIPE_PUBLISHABLE_KEY'; // Replace with your actual Stripe Publishable Key

let stripePromise;

const usePayment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const initiatePayment = async (userId, appId) => {
        if (!userId) {
            setError('User must be logged in to make a payment.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (!stripePromise) {
                stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
            }
            const stripe = await stripePromise;

            if (!stripe) {
                throw new Error('Stripe.js failed to load.');
            }

            const session = await fetchCheckoutSession(userId, appId);

            if (session.error) {
                throw new Error(session.error);
            }

            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {
                throw new Error(result.error.message);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, initiatePayment };
};

export default usePayment;