import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import playerSlice from './Slice/playerSlice';
import teamSlice from './Slice/teamSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: playerSlice,
    team: teamSlice,
  },
});
