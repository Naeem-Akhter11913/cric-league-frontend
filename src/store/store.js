import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import playerSlice from './Slice/playerSlice';
import teamSlice from './Slice/teamSlice';
import organizerSlice from './Slice/organizerSlice';
import venueSlice from './Slice/venueSlice';
import tournamentsSlice from './Slice/tournamentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    players: playerSlice,
    team: teamSlice,
    organizer: organizerSlice,
    venue: venueSlice,
    tournaments: tournamentsSlice
  },
});
