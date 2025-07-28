// ----------------------------------------------------------------------
// warrior-built/src/features/auth/authSlice.js (REFACTORED FOR FIREBASE)
// ----------------------------------------------------------------------
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  user: null, // User state will be populated by the Firebase listener
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// The logout thunk now just handles clearing local state.
// Firebase sign out is handled separately in the Header component.
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    // New reducer to set the user from the Firebase listener
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // New reducer to clear the user on logout
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // We only need to handle the logout case now
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { reset, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
