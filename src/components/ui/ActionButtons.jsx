import React from 'react';
import { Box, Button } from '@mui/material';

const ActionButtons = ({ userId, isSubscribed }) => {
    const handleSubscribe = () => {
        // Subscription logic here
        console.log('Subscribe clicked');
    };

    const handleSignIn = () => {
        // Sign in logic here
        console.log('Sign in clicked');
    };

    return (
        <Box className="btn" sx={{ gap: 2, flexWrap: 'wrap' }}>
            {!userId && (
                <Button 
                    variant="contained" 
                    className="btn btn-secondary-light"
                    onClick={handleSignIn}
                    sx={{ minWidth: '120px' }}
                >
                    Sign In
                </Button>
            )}
            {userId && !isSubscribed && (
                <Button 
                    variant="contained" 
                    className="btn btn-secondary"
                    onClick={handleSubscribe}
                    sx={{ minWidth: '120px' }}
                >
                    Subscribe Now
                </Button>
            )}
            {userId && isSubscribed && (
                <Button 
                    variant="outlined" 
                    className="btn btn-secondary"
                    disabled
                    sx={{ minWidth: '120px' }}
                >
                    Subscribed ✓
                </Button>
            )}
        </Box>
    );
};

export default ActionButtons;