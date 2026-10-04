// import { createAsyncThunk } from '@reduxjs/toolkit';
// import * as playingXIAPI from '../API/playingXLAPI';

// export const fetchPlayingXI = createAsyncThunk('playingXI/fetch', async (params, { rejectWithValue }) => {
//   try {
//     const res = await playingXIAPI.fetchPlayingXIRequest('/playing-xi', { params });
//     return res.data.data;
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || 'Failed to load Playing XI');
//   }
// });

// export const savePlayingXI = createAsyncThunk('playingXI/save', async (payload, { rejectWithValue }) => {
//   try {
//     const res = await playingXIAPI.savePlayingXI('/playing-xi', payload);
//     return res.data.data;
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || 'Failed to save Playing XI');
//   }
// });


import { createAsyncThunk } from '@reduxjs/toolkit';
import * as playingXIAPI from '../API/playingXLAPI';

export const fetchPlayingXI = createAsyncThunk(
  'playingXI/fetch',
  async (params, { rejectWithValue }) => {
    try {
      const body = await playingXIAPI.fetchPlayingXIRequest(params); // { message, data }
      return body.data;                                              // XI object or null
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load Playing XI');
    }
  }
);

export const savePlayingXI = createAsyncThunk(
  'playingXI/save',
  async (payload, { rejectWithValue }) => {
    try {
      const body = await playingXIAPI.savePlayingXIRequest(payload);
      return body.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to save Playing XI');
    }
  }
);

export const fetchPlayingXIList = createAsyncThunk(
  'playingXI/list',
  async (params, { rejectWithValue }) => {
    try {
      const body = await playingXIAPI.fetchPlayingXIListRequest(params);
      return body.data; // { items, total, page, limit }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load Playing XIs');
    }
  }
);

export const deletePlayingXI = createAsyncThunk(
  'playingXI/delete',
  async (id, { rejectWithValue }) => {
    try {
      await playingXIAPI.deletePlayingXIRequest(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete Playing XI');
    }
  }
);