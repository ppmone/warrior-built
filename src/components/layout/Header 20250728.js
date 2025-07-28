import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { getAuth, signOut } from 'firebase/auth';
import { logout } from '../features/auth/authSlice';

function Header({ onLoginClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    const auth = getAuth();
    signOut(auth); // Sign out from Firebase
    dispatch(logout()); // Clear our Redux state
    navigate('/');
  };

    return (
        <header className='header'>
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
                <ul>
                    {user ? (
                    <li>
                        <button className="btn btn-secondary" onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                        </button>
                    </li>
                    ) : (
                    <>
                        <li>
                        <button className="btn btn-secondary" onClick={onLoginClick}>
                            <FaSignInAlt /> Login
                        </button>
                        </li>
                        <li>
                        <button className="btn btn-secondary" onClick={onLoginClick}>
                            <FaUser /> Sign Up
                        </button>
                        </li>
                    </>
                    )}
                </ul>
  {/*                  <Button 
                        variant="outlined" 
                        className="btn btn-secondary"
                        onClick={handleSignOut}>
                        {userId ? 'Sign Out' : 'Sign In'}
                    </Button>
                    */}
                </Toolbar>
            </AppBar>
        </header>
    );
};

export default Header;