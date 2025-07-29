// warrior-built/src/App.js
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import Header from './components/layout/Header'; // Using your specified path
import Carousel from './components/carousel/Carousel'; // Including your Carousel
import GatedContent from './pages/GatedContent';
import FreeContent from './pages/FreeContent';
import PrivateRoute from './components/PrivateRoute';
import AuthModal from './components/auth/AuthModal';
import { setUser, clearUser } from './features/auth/authSlice';

// A wrapper component to allow useNavigate hook within the main App component logic
const AppContent = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  // Use a ref to track if the email/password login flow was initiated
  const loginFlowInitiated = useRef(false);

  const handleOpenAuthModal = () => {
    // When the user clicks login/signup, set the ref to true
    loginFlowInitiated.current = true;
    setAuthModalOpen(true);
  };

  useEffect(() => {
    // --- This part handles the Google Sign-In Redirect ---
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // This block runs only when a user is successfully redirected back from Google.
          // The onAuthStateChanged listener below will handle setting the user state.
          // We just need to trigger the navigation here.
          navigate('/gated-content');
        }
      })
      .catch((error) => {
        console.error("Error processing Google redirect result:", error);
      });
    // --- End of Google Redirect Handling ---

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName,
          })
        );
        // This part handles the redirect for the email/password flow
        if (loginFlowInitiated.current) {
          navigate('/gated-content');
          // Reset the ref after redirecting
          loginFlowInitiated.current = false;
        }
        setAuthModalOpen(false);
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch, navigate]);

  return (
    <>
      <Header onLoginClick={handleOpenAuthModal} />
      <Box sx={{ paddingTop: '100px' }}>
        <Carousel />
      </Box>
      <Routes>
        <Route path='/' element={<FreeContent />} />
        <Route path='/free-content' element={<FreeContent />} />
        
        <Route path='/gated-content' element={<PrivateRoute />}>
          <Route path='/gated-content' element={<GatedContent />} />
        </Route>
      </Routes>
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        <AppContent />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
