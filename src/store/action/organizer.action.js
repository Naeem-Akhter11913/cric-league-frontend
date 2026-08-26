import { createAsyncThunk } from '@reduxjs/toolkit';
import * as organizerAPI from '../API/organizerAPI';


export const organizerList = createAsyncThunk(
  'organizer/list',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await organizerAPI.organizerListRequest(payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to get player list'
      );
    }
  }
);