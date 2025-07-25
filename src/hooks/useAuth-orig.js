import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken, signOut } from 'firebase/auth';

const useAuth = (initialAuthToken) => {
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fbAuth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(fbAuth, (user) => {
            setIsAuthReady(true);
            setLoading(false);

            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        const signIn = async () => {
            try {
                if (initialAuthToken) {
                    await signInWithCustomToken(fbAuth, initialAuthToken);
                } else {
                    await signInAnonymously(fbAuth);
                }
            } catch (err) {
                console.error("Authentication error:", err);
                setError(err);
            }
        };

        signIn();

        return () => unsubscribe();
    }, [fbAuth, initialAuthToken]);

    const handleLogout = async () => {
        try {
            await signOut(fbAuth);
        } catch (err) {
            console.error("Error logging out:", err);
            setError(err);
        }
    };

    return { userId, isAuthReady, loading, error, handleLogout };
};

export default useAuth;