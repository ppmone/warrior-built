import { doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const subscriptionService = (db) => {
    const updateSubscriptionStatus = async (userId, isSubscribed) => {
        const subscriptionDocRef = doc(db, `artifacts/${process.env.REACT_APP_APP_ID}/users/${userId}/subscriptions/status`);
        try {
            await setDoc(subscriptionDocRef, { isSubscribed }, { merge: true });
            return { success: true };
        } catch (error) {
            console.error("Error updating subscription status:", error);
            return { success: false, error: error.message };
        }
    };

    return {
        updateSubscriptionStatus,
    };
};

export default subscriptionService;