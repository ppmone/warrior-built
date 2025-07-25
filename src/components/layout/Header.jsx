import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import AuthModal from '../auth/AuthModal';

const Header = ({ userId, isSubscribed, onSignOut }) => {
    const [authModalOpen, setAuthModalOpen] = useState(false);

    const handleSubscribe = () => {
        // Subscription logic here
        console.log('Subscribe clicked');
    };

    const handleOpenAuthModal = () => {
        setAuthModalOpen(true);
    };

    const handleCloseAuthModal = () => {
        setAuthModalOpen(false);
    };

    return (
        <>
            <AppBar 
                position="fixed" 
                className="header" 
                sx={{ 
                    boxShadow: 'none', 
                    mb: 0,
                    zIndex: (theme) => theme.zIndex.appBar,
                    top: 0,
                    left: 0,
                    right: 0
                }}
            >
                <Toolbar 
                    className="flex-between" 
                    sx={{ 
                        height: '100px',
                        alignItems: 'center',
                        padding: '0 24px'
                    }}
                >
                    <Box 
                        className="flex" 
                        sx={{ 
                            alignItems: 'center', 
                            gap: 1,
                            height: '100%'
                        }}
                    >
                        <img 
                            src="./public/atlas-50.png" 
                            alt="Warrior Built Logo" 
                            style={{ 
                                width: '80px', 
                                height: '80px',
                                objectFit: 'contain'
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
                                alignItems: 'center'
                            }}
                        >
                            Warrior Built
                        </Typography>
                    </Box>
                    <Box 
                        className="flex" 
                        sx={{ 
                            alignItems: 'center', 
                            gap: 2,
                            height: '100%'
                        }}
                    >
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: 'rgba(255,255,255,0.8)',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            Premium Content Platform
                        </Typography>
                        
                        {/* Dynamic Action Buttons */}
                        {!userId && (
                            <Button 
                                variant="contained" 
                                className="btn btn-secondary"
                                onClick={handleOpenAuthModal}
                                sx={{ 
                                    minWidth: '100px',
                                    height: '40px',
                                    backgroundColor: 'var(--blueGrey-300)',
                                    color: 'var(--blueGrey-600)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        backgroundColor: 'var(--blueGrey-50)'
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                        )}
                        
                        {userId && !isSubscribed && (
                            <>
                                <Button 
                                    variant="contained" 
                                    className="btn btn-primary"
                                    onClick={handleSubscribe}
                                    sx={{ 
                                        minWidth: '120px',
                                        height: '40px',
                                        backgroundColor: 'var(--primary-color)',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'var(--primary-dark)'
                                        }
                                    }}
                                >
                                    Subscribe Now
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    className="btn btn-secondary"
                                    onClick={onSignOut}
                                    sx={{ 
                                        minWidth: '100px',
                                        height: '40px',
                                        borderColor: 'var(--blueGrey-300)',
                                        color: 'white',
                                        '&:hover': {
                                            borderColor: 'var(--blueGrey-50)',
                                            backgroundColor: 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </>
                        )}
                        
                        {userId && isSubscribed && (
                            <>
                                <Button 
                                    variant="outlined" 
                                    className="btn btn-secondary"
                                    disabled
                                    sx={{ 
                                        minWidth: '120px',
                                        height: '40px',
                                        borderColor: 'var(--blueGrey-300)',
                                        color: 'rgba(255,255,255,0.6)'
                                    }}
                                >
                                    Subscribed ✓
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    className="btn btn-secondary"
                                    onClick={onSignOut}
                                    sx={{ 
                                        minWidth: '100px',
                                        height: '40px',
                                        borderColor: 'var(--blueGrey-300)',
                                        color: 'white',
                                        '&:hover': {
                                            borderColor: 'var(--blueGrey-50)',
                                            backgroundColor: 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Auth Modal */}
            <AuthModal 
                open={authModalOpen} 
                onClose={handleCloseAuthModal} 
            />
        </>
    );
};

export default Header;