// import { createAsyncThunk } from '@reduxjs/toolkit';
// import * as pointTableAPI from '../API/pointsTableAPI';

// const thunk = (type, call, fallback) =>
//   createAsyncThunk(type, async (arg, { rejectWithValue }) => {
//     try {
//       const body = await call(arg);
//       return body.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || fallback);
//     }
//   });



//   export const fetchScorers = thunk('pointtable/table', (params) => pointTableAPI.getPointsTableRequest(params), 'Failed to load point table data');

import { createAsyncThunk } from '@reduxjs/toolkit';
import * as pointTableAPI from '../API/pointsTableAPI';

export const getPointsTable = createAsyncThunk(
  'pointtable/table',
  async (params, { rejectWithValue }) => {
    try {
      const response = await pointTableAPI.getPointsTableRequest(params);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to load point table data'
      );
    }
  }
);