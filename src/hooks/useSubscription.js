import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const useSubscription = (userId, appId) => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fbDb = getFirestore(); // Initialize Firestore

    useEffect(() => {
        if (!userId) {
            setIsSubscribed(false);
            setLoading(false);
            return;
        }

        const subscriptionDocRef = doc(fbDb, `artifacts/${appId}/users/${userId}/subscriptions/status`);

        const unsubscribe = onSnapshot(subscriptionDocRef, (docSnap) => {
            if (docSnap.exists()) {
                setIsSubscribed(docSnap.data().isSubscribed || false);
            } else {
                setIsSubscribed(false);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error listening to subscription changes:", error);
            setError("Error loading subscription status.");
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [userId, appId, fbDb]);

    return { isSubscribed, loading, error };
};

export default useSubscription;