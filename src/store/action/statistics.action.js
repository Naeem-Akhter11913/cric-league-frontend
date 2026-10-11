import { createAsyncThunk } from '@reduxjs/toolkit';
import * as statisticsAPI from '../API/statisticsAPI';

export const getStatisticsTable = createAsyncThunk(
  'statatics/data',
  async (params, { rejectWithValue }) => {
    try {
      console.log(params)
      const response = await statisticsAPI.getStatisticsRequest(params);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to load statics table data'
      );
    }
  }
);