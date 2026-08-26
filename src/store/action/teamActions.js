import { createAsyncThunk } from '@reduxjs/toolkit';
import * as teamAPI from '../API/teamAPI';

// Create Team
export const createTeam = createAsyncThunk(
  'team/create',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await teamAPI.createTeamRequest(payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to create team'
      );
    }
  }
);

// Get Team List
export const teamList = createAsyncThunk(
  'team/list',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await teamAPI.teamListRequest(payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to get team list'
      );
    }
  }
);

// Get Team By ID
export const teamGetById = createAsyncThunk(
  'team/getById',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await teamAPI.teamGetByIdRequest(payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to get team'
      );
    }
  }
);

// Update Team
export const updateTeam = createAsyncThunk(
  'team/update',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await teamAPI.updateTeamRequest({ id, payload });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update team'
      );
    }
  }
);

// Add Player to Team
export const addPlayerToTeam = createAsyncThunk(
  'team/addPlayer',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const data = await teamAPI.addPlayerRequest({ id, payload });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to add player to team'
      );
    }
  }
);

// List Players in Team
export const listTeamPlayers = createAsyncThunk(
  'team/listPlayers',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await teamAPI.listTeamPlayersRequest(payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to list team players'
      );
    }
  }
);