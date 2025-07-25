import React, { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import LoadingOverlay from './components/common/LoadingOverlay';
import StatusMessage from './components/common/StatusMessage';
import Header from './components/layout/Header';
import Carousel from './components/carousel/Carousel';
import Layout from './components/layout/Layout';
import FreeContent from './components/content/FreeContent';
import GatedContent from './components/content/GatedContent';
import UserInfo from './components/ui/UserInfo';

const App = () => {
    const [userId, setUserId] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState('Loading...');
    const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(true);

    const BACKEND_URL = 'http://localhost:8080/api';

    // Fetch subscription status from the backend
    const fetchSubscriptionStatus = async (userId) => {
        try {
            const response = await fetch(`${BACKEND_URL}/users/${userId}/subscription`);
            if (response.ok) {
                const data = await response.json();
                setIsSubscribed(data.isSubscribed);
                setStatusMessage(
                    data.isSubscribed
                        ? 'Premium content unlocked!'
                        : 'Subscribe to unlock premium content'
                );
            } else {
                console.error('Failed to fetch subscription status');
                setIsSubscribed(false);
                setStatusMessage('Subscribe to unlock premium content');
            }
        } catch (error) {
            console.error('Error fetching subscription status:', error);
            setIsSubscribed(false);
            setStatusMessage('Unable to check subscription status');
        } finally {
            setIsSubscriptionLoading(false);
        }
    };

    // Create a new user in the backend
    const createUserInBackend = async (userId, email) => {
        try {
            const response = await fetch(`${BACKEND_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId, email }),
            });
            if (response.ok) {
                console.log('User created successfully');
            } else {
                console.error('Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    // Simulate user authentication (replace with actual auth logic)
    useEffect(() => {
        const mockUserId = 'user1'; // Replace with actual user ID from authentication
        const mockEmail = 'user1@example.com'; // Replace with actual email from authentication

        setUserId(mockUserId);
        createUserInBackend(mockUserId, mockEmail);
        fetchSubscriptionStatus(mockUserId);
        setIsAuthReady(true);
        setLoading(false);
    }, []);

    return (
        <Box className="fade-in" sx={{ minHeight: '100vh', bgcolor: '#f0f2f5' }}>
            <LoadingOverlay loading={loading} />
            <Header userId={userId} isSubscribed={isSubscribed} />
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