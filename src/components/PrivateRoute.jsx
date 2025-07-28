import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  // If the user is not logged in, redirect them to the home page,
  // NOT the old /login page.
  return loggedIn ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;