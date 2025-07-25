import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = ({ userId, isSubscribed }) => {
    const handleSignOut = () => {
        console.log('Sign out logic here'); // Replace with actual sign-out logic
    };

    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Warrior Built
                </Typography>
                {userId && (
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                        {isSubscribed ? 'Premium Content Platform' : 'Free Content Platform'}
                    </Typography>
                )}
                <Button color="inherit" onClick={handleSignOut}>
                    {userId ? 'Sign Out' : 'Sign In'}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;