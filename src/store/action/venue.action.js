import { createAsyncThunk } from '@reduxjs/toolkit';
import * as venueAPI from '../API/venueAPI';

// Create venue
export const venueTeam = createAsyncThunk(
  'venue/create',
  async (payload, { rejectWithValue }) => {
    try {
        console.log(payload)
      const data = await venueAPI.createVenueRequest(payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to create venue'
      );
    }
  }
);