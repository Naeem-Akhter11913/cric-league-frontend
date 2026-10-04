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


export const createPlayer = createAsyncThunk(
    'organizer/create',
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await organizerAPI.organizerPlyerCreateRequest(payload);
            return data;
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || 'Failed to add player');
        }
    }
);




export const fetchOrgPlayers = createAsyncThunk('organizer/fetchPlayers', async (params, { rejectWithValue }) => {
  try {
    const body = await organizerAPI.fetchOrgPlayersRequest(params);
    return body.data; // { items, total, page, limit }
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to load players');
  }
});

export const fetchOrgPlayerStats = createAsyncThunk('organizer/playerStats', async (_, { rejectWithValue }) => {
  try {
    const body = await organizerAPI.fetchOrgPlayerStatsRequest();
    return body.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to load player stats');
  }
});

export const removeOrgPlayer = createAsyncThunk('organizer/removePlayer', async (id, { rejectWithValue }) => {
  try {
    const body = await organizerAPI.removeOrgPlayerRequest(id);
    return body.data; // { teamsAffected, playingXIsDeleted }
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to remove player');
  }
});