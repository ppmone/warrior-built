import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = ({ userId, isSubscribed, onSignOut }) => {
    const handleSignOut = () => {
        // Call the parent component's sign out function
        if (onSignOut) {
            onSignOut();
        }
        console.log('User signed out');
    };

    return (
        <AppBar
            position="fixed"
            className="header"
            sx={{
                boxShadow: 'none',
                mb: 0,
                zIndex: (theme) => theme.zIndex.appBar,
                top: 0,
                left: 0,
                right: 0,
            }}
        >
            <Toolbar
                className="flex-between"
                sx={{
                    height: '100px',
                    alignItems: 'center',
                    padding: '0 24px',
                }}
            >
                <Box
                    className="flex"
                    sx={{
                        alignItems: 'center',
                        gap: 1,
                        height: '100%',
                    }}
                >
                    <img
                        src="/atlas-50.png"
                        alt="Warrior Built Logo"
                        style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'contain',
                        }}
                    />
                    <Typography
                        variant="h5"
                        component="h1"
                        className="text-secondary-light"
                        sx={{
                            fontWeight: 'bold',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        Warrior Built
                    </Typography>
                </Box>

                {userId && (
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                        {isSubscribed ? 'Premium Content Platform' : 'Free Content Platform'}
                    </Typography>
                )}

                <Button 
                    variant="outlined" 
                    className="btn btn-secondary"
                    onClick={handleSignOut}>
                    {userId ? 'Sign Out' : 'Sign In'}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;