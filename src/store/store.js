import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import playerSlice from './Slice/playerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: playerSlice,
  },
});
