
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../API/authAPI';
import { setAccessToken, clearAccessToken } from '../../api/axiosInstance';

// ---- Async thunks ----
// Each thunk calls the API and syncs the access token into axiosInstance
// (so subsequent requests are authenticated) as well as into redux state.
// The refresh token is never handled here at all anymore — it lives in an
// httpOnly cookie that the browser sends automatically on every request.

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authAPI.registerRequest(payload);
      return data; // { user, accessToken }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authAPI.loginRequest(payload);
      setAccessToken(data.accessToken);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const refreshSession = createAsyncThunk(
  'auth/refreshSession',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authAPI.refreshRequest(); // no argument — cookie carries the token
      setAccessToken(data.accessToken);
      return data; // { accessToken }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Session refresh failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logoutRequest(); // no argument
      clearAccessToken();
      return true;
    } catch (err) {
      clearAccessToken(); // still log out client-side even if the server call fails
      return rejectWithValue(err.response?.data?.message || 'Logout failed');
    }
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authAPI.refreshRequest(); // no argument
      setAccessToken(data.accessToken);
      // console.log("data.accessToken",data.accessToken)
      return data;
    } catch (err) {
      clearAccessToken();
      return rejectWithValue(err.response?.data?.message || 'Session restore failed');
    }
  }
);