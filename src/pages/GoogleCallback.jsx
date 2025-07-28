// ----------------------------------------------------------------------
// warrior-built/src/pages/GoogleCallback.jsx (NEW FILE)
// ----------------------------------------------------------------------
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function GoogleCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // The backend has successfully authenticated the user and sent us a token.
      // We need to store this token and update our application's state.
      
      // 1. Store the user object (with the token) in localStorage
      localStorage.setItem('user', JSON.stringify({ token }));
      
      // 2. Dispatch an action to update the Redux store
      dispatch(loginSuccess({ token }));
      
      // 3. Redirect the user to the protected content page
      navigate('/gated-content');
    } else {
      // If no token is present, something went wrong. Redirect to login.
      navigate('/login');
    }
  }, [dispatch, navigate, location]);

  // Show a spinner while processing
  return <Spinner />;
}

export default GoogleCallback;
