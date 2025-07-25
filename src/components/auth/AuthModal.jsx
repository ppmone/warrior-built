import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    Divider,
    IconButton,
    Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider 
} from 'firebase/auth';
import { getAuth } from 'firebase/auth';

const AuthModal = ({ open, onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // Configure Google provider
    googleProvider.setCustomParameters({
        prompt: 'select_account'
    });

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isSignUp) {
                if (password !== confirmPassword) {
                    throw new Error('Passwords do not match');
                }
                if (password.length < 6) {
                    throw new Error('Password must be at least 6 characters');
                }
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            onClose();
        } catch (err) {
            console.error('Email auth error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        setLoading(true);
        setError('');

        try {
            // Use redirect instead of popup to avoid COOP issues
            await signInWithRedirect(auth, googleProvider);
            // Note: The redirect will handle the auth flow
            // The result will be handled in your App.jsx useEffect
        } catch (err) {
            console.error('Google auth error:', err);
            setError('Google sign-in failed. Please try again.');
            setLoading(false);
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
        setLoading(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        resetForm();
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '12px',
                    padding: '8px'
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, pb: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ color: 'grey.500' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ pt: 1 }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Google Sign In Button */}
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleGoogleAuth}
                    disabled={loading}
                    startIcon={<GoogleIcon />}
                    sx={{
                        mb: 2,
                        height: '48px',
                        borderColor: '#dadce0',
                        color: '#3c4043',
                        '&:hover': {
                            borderColor: '#dadce0',
                            backgroundColor: '#f8f9fa'
                        }
                    }}
                >
                    {loading ? 'Redirecting...' : (isSignUp ? 'Sign up with Google' : 'Sign in with Google')}
                </Button>

                <Divider sx={{ my: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        or
                    </Typography>
                </Divider>

                {/* Email/Password Form */}
                <Box component="form" onSubmit={handleEmailAuth}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                        disabled={loading}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                        disabled={loading}
                        helperText={isSignUp ? "Password must be at least 6 characters" : ""}
                    />

                    {isSignUp && (
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                            disabled={loading}
                        />
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading || !email || !password || (isSignUp && !confirmPassword)}
                        sx={{
                            height: '48px',
                            backgroundColor: 'var(--blueGrey-600)',
                            '&:hover': {
                                backgroundColor: 'var(--blueGrey-700)'
                            }
                        }}
                    >
                        {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                    </Button>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <Button
                        onClick={toggleMode}
                        disabled={loading}
                        sx={{ 
                            ml: 1, 
                            textTransform: 'none',
                            color: 'var(--primary-color)'
                        }}
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </Button>
                </Typography>
            </DialogActions>
        </Dialog>
    );
};

export default AuthModal;