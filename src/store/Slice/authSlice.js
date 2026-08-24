import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
  restoreSession,
} from "../action/auth.action";

const initialState = {
  user: null,
  accessToken: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  success: null,
  sessionChecked: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sessionExpired: (state) => {
      state.user = null;
      state.accessToken = null;
      state.status = 'idle';
      state.error = 'Session expired, please log in again';
    },
    clearAuthError: (state) => {
      state.error = null;
      state.status = 'idle';
    },
    clearAuthSuccess: (state) => {
      state.success = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.success = action.payload.message
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // refresh (silent)
      .addCase(refreshSession.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.userDetails;
      })
      .addCase(refreshSession.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.error = action.payload;
      })

      // restoreSession (app boot) — THIS is what sets sessionChecked.
      // Without these two cases, sessionChecked can never become true.
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.userDetails;
        state.sessionChecked = true;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.sessionChecked = true;
      })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.status = 'idle';
      });
  },
});

export const { sessionExpired, clearAuthError } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => Boolean(state.auth.accessToken);
export const selectSessionChecked = (state) => state.auth.sessionChecked;

export default authSlice.reducer;