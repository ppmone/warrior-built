import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics"; 
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut, 
    getRedirectResult 
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, 
    onSnapshot 
} from 'firebase/firestore';

import { Container, Box } from '@mui/material';
import LoadingOverlay from './components/common/LoadingOverlay';
import StatusMessage from './components/common/StatusMessage';
import Header from './components/layout/Header';
import Carousel from './components/carousel/Carousel';
import Layout from './components/layout/Layout';
import FreeContent from './components/content/FreeContent';
import GatedContent from './components/content/GatedContent';
import UserInfo from './components/ui/UserInfo';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRRkdqKL-G1lMMPeHWna4W7B4afOXlFrs",
    authDomain: "warrior-built.firebaseapp.com",
    projectId: "warrior-built",
    storageBucket: "warrior-built.firebasestorage.app",
    messagingSenderId: "492643304856",
    appId: "1:492643304856:web:43887c7c41f68b2f8cd7ed",
    measurementId: "G-8WJ8ZBFY65"
};

// Initialize Firebase outside of the component to avoid re-initialization
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const App = () => {
    const [userId, setUserId] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState('Loading...');
    const [subscriptionListener, setSubscriptionListener] = useState(null);
    const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(true);

    const fbDb = getFirestore(app);
    const fbAuth = getAuth(app);

    useEffect(() => {
        let isMounted = true;

        const initializeAuth = async () => {
            try {
                // Handle redirect result from Google OAuth
                const result = await getRedirectResult(fbAuth);
                if (result) {
                    console.log('Google auth redirect successful:', result.user.email);
                }
            } catch (error) {
                console.error('Redirect result error:', error);
                setStatusMessage('Authentication error occurred');
            }

            // Set up auth state listener
            const unsubscribe = onAuthStateChanged(fbAuth, (user) => {
                if (!isMounted) return;

                setIsAuthReady(true);
                setLoading(false);

                if (user) {
                    console.log('User logged in:', user.email);
                    setUserId(user.uid);
                    setStatusMessage(`Welcome, ${user.email || 'User'}!`);
                    startSubscriptionListener(user.uid);
                } else {
                    console.log('No user logged in');
                    setUserId(null);
                    setIsSubscribed(false);
                    setStatusMessage('Please sign in to access premium content');
                    
                    // Clean up subscription listener
                    if (subscriptionListener) {
                        subscriptionListener();
                        setSubscriptionListener(null);
                    }
                }
            });

            return unsubscribe;
        };

        initializeAuth().then((cleanup) => {
            if (cleanup && isMounted) {
                // Store cleanup function
            }
        });

        return () => {
            isMounted = false;
            if (subscriptionListener) {
                subscriptionListener();
            }
        };
    }, [fbAuth]);

    const startSubscriptionListener = (currentUserId) => {
        try {
            const subscriptionDocRef = doc(
                fbDb, 
                `artifacts/warrior-built/users/${currentUserId}/subscriptions/status`
            );
            console.log('Listening to Firestore path:', subscriptionDocRef.path); // Debugging log

            const unsubscribe = onSnapshot(
                subscriptionDocRef,
                (docSnap) => {
                    console.log('Snapshot received:', docSnap.exists() ? docSnap.data() : 'No document found'); // Debugging log
                    setIsSubscriptionLoading(false); // Stop loading once data is fetched
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setIsSubscribed(data.isSubscribed || false);
                        setStatusMessage(
                            data.isSubscribed 
                                ? 'Premium content unlocked!' 
                                : 'Subscribe to unlock premium content'
                        );
                    } else {
                        setIsSubscribed(false);
                        setStatusMessage('Subscribe to unlock premium content');
                    }
                },
                (error) => {
                    console.error('Subscription listener error:', error);
                    setIsSubscribed(false);
                    setStatusMessage('Unable to check subscription status');
                    setIsSubscriptionLoading(false); // Stop loading on error
                }
            );

            setSubscriptionListener(() => unsubscribe);
        } catch (error) {
            console.error('Failed to start subscription listener:', error);
            setStatusMessage('Unable to connect to subscription service');
            setIsSubscriptionLoading(false); // Stop loading on error
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(fbAuth);
            setStatusMessage('Signed out successfully');
        } catch (error) {
            console.error('Sign out error:', error);
            setStatusMessage('Error signing out');
        }
    };

    return (
        <Box className="fade-in" sx={{ minHeight: '100vh', bgcolor: '#f0f2f5' }}>
            <LoadingOverlay loading={loading} />
            <Header 
                userId={userId} 
                isSubscribed={isSubscribed}
                onSignOut={handleSignOut} 
            />
            <Box sx={{ paddingTop: '100px' }}>
                <Carousel />
                <Layout>
                    <Container maxWidth="md" className="container">
                        <StatusMessage message={statusMessage} />
                        <UserInfo userId={userId} />
                        {isSubscriptionLoading ? (
                            <p>Loading subscription status...</p>
                        ) : userId && isSubscribed ? (
                            <GatedContent />
                        ) : (
                            <FreeContent />
                        )}
                    </Container>
                </Layout>
            </Box>
        </Box>
    );
};

export default App;