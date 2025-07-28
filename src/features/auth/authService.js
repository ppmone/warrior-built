// warrior-built/src/features/auth/authService.js

import axios from 'axios';

// The base URL for our user-related API endpoints.
// The '/api/users' part should match your backend routes.
const API_URL = '/api/users/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    // On successful registration, the backend sends back user data including a token.
    // We store this in localStorage so the user stays logged in.
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    // On successful login, store the user data in localStorage.
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  // To log out, we simply remove the user's data from localStorage.
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
