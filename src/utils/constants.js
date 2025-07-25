// File: /warrior-built/warrior-built/src/utils/constants.js

export const STRIPE_PUBLISHABLE_KEY = 'YOUR_STRIPE_PUBLISHABLE_KEY'; // Replace with your actual Stripe Publishable Key
export const BACKEND_URL = 'YOUR_BACKEND_SERVER_URL'; // Replace with your actual backend server URL

export const MESSAGES = {
    LOADING: 'Loading...',
    ERROR_INITIALIZING: 'Error: Could not initialize app. Check console.',
    ERROR_LOGGING_IN: 'Error logging in.',
    ERROR_LOGGING_OUT: 'Error logging out.',
    ERROR_UNSUBSCRIBING: 'Error unsubscribing. Please try again.',
    ERROR_PAYMENT_FAILED: 'Payment failed: ',
    ERROR_BACKEND: 'Backend error: ',
    UNEXPECTED_RESPONSE: 'Unexpected response from backend.',
    PLEASE_LOG_IN: 'Please log in to manage subscription!',
    PLEASE_MAKE_PAYMENT: 'Please click "Make Payment" to subscribe.',
};

export const USER_STATUS = {
    LOGGED_IN: 'logged in',
    LOGGED_OUT: 'logged out',
    SUBSCRIBED: 'subscribed',
    NOT_SUBSCRIBED: 'not subscribed',
};