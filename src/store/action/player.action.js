
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import * as playerAPT from '../API/playerAPI'

// export const createProfile = createAsyncThunk(
//     'player/create',
//     async (payload, { rejectWithValue }) => {
//         try {
//             const data = await playerAPT.createProfileRequest(payload);
//             return data; // { user, accessToken }
//         } catch (err) {
//             return rejectWithValue(err.response?.data?.message || 'Registration failed');
//         }
//     }
// );

// export const getMyProfile = createAsyncThunk(
//     'player/me',
//     async (payload, { rejectWithValue }) => {
//         try {
//             const data = await playerAPT.getMyProfileRequest(payload);
//             return data; // { user, accessToken }
//         } catch (err) {
//             return rejectWithValue(err.response?.data?.message || 'Registration failed');
//         }
//     }
// );

// export const updateMyProfile = createAsyncThunk(
//     'player/me',
//     async (payload, { rejectWithValue }) => {
//         try {
//             const data = await playerAPT.updateMyProfileRequest(payload);
//             return data; // { user, accessToken }
//         } catch (err) {
//             return rejectWithValue(err.response?.data?.message || 'Registration failed');
//         }
//     }
// );


// export const playerList = createAsyncThunk(
//     'player/param',
//     async (payload, { rejectWithValue }) => {
//         try {
//             const data = await playerAPT.playerListRequest(payload);
//             return data; // { user, accessToken }
//         } catch (err) {
//             return rejectWithValue(err.response?.data?.message || 'Registration failed');
//         }
//     }
// );

// export const playerGetById = createAsyncThunk(
//     'player/id',
//     async (payload, { rejectWithValue }) => {
//         try {
//             const data = await playerAPT.playerGetByIdRequest(payload);
//             return data; // { user, accessToken }
//         } catch (err) {
//             return rejectWithValue(err.response?.data?.message || 'Registration failed');
//         }
//     }
// );



import { createAsyncThunk } from '@reduxjs/toolkit';
import * as playerAPI from '../API/playerAPI';

// Create Player Profile
export const createProfile = createAsyncThunk(
  'player/create',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await playerAPI.createProfileRequest(payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to create profile'
      );
    }
  }
);

// Get My Profile
export const getMyProfile = createAsyncThunk(
  'player/getMe',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await playerAPI.getMyProfileRequest(payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to get profile'
      );
    }
  }
);

// Update My Profile
export const updateMyProfile = createAsyncThunk(
  'player/updateMe',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await playerAPI.updateMyProfileRequest(payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update profile'
      );
    }
  }
);

// Get Player List
export const playerList = createAsyncThunk(
  'player/list',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await playerAPI.playerListRequest(payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to get player list'
      );
    }
  }
);

// Get Player By ID
export const playerGetById = createAsyncThunk(
  'player/getById',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await playerAPI.playerGetByIdRequest(payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to get player'
      );
    }
  }
);