// warrior-built/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { Container, Box } from '@mui/material'
import Header from './components/layout/Header';
import Carousel from './components/carousel/Carousel';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import GatedContent from './pages/GatedContent';
import FreeContent from './pages/FreeContent';
import PrivateRoute from './components/PrivateRoute';
import AuthModal from './components/auth/AuthModal';
import { setUser, clearUser } from './features/auth/authSlice';

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName,
          })
        );
        setAuthModalOpen(false);
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  return (
    <>
      <Router>
        {/* The Container component has been removed from here */}
        <Header onLoginClick={() => setAuthModalOpen(true)} />
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
        </Router>
        <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
        <ToastContainer />
    </>
  );
}

export default App;