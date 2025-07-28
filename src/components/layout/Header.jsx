// ----------------------------------------------------------------------
// warrior-built/src/components/Header.jsx (CORRECTED)
// ----------------------------------------------------------------------
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { logout } from '../../features/auth/authSlice';

function Header({ onLoginClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    const auth = getAuth();
    signOut(auth);
    dispatch(logout());
    navigate('/');
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
        <Box>
            {user ? (
                <Button className="btn btn-secondary" color="inherit" onClick={onLogout}>
                Logout
                </Button>
            ) : (
                <>
                <Button className="btn btn-secondary" color="inherit" onClick={onLoginClick}>
                    Login
                </Button>
                <Button className="btn btn-secondary" variant="contained" onClick={onLoginClick} sx={{ ml: 2 }}>
                    Sign Up
                </Button>
                </>
            )}
            </Box>
        </Toolbar>
    </AppBar>
  );
}

export default Header;