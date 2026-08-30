import { createAsyncThunk } from '@reduxjs/toolkit';
import * as tournamentAPI from '../API/tournamentAPI';

export const createTournament = createAsyncThunk(
  'tournament/create',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await tournamentAPI.createTournamentRequest(payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to create tournament'
      );
    }
  }
);

export const fetchTournament = createAsyncThunk(
  'tournament/fetchSingle',
  async (id, { rejectWithValue }) => {
    try {
      const data = await tournamentAPI.getTournamentRequest(id);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch tournament'
      );
    }
  }
);

export const updateTournament = createAsyncThunk(
  'tournament/update',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await tournamentAPI.updateTournamentRequest(payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update tournament'
      );
    }
  }
);

export const fetchTournaments = createAsyncThunk(
  'tournament/list',
  async (params, { rejectWithValue }) => {
    try {
      const data = await tournamentAPI.listTournamentsRequest(params);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch tournaments'
      );
    }
  }
);

export const fetchTournamentById = createAsyncThunk(
  'tournament/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await tournamentAPI.getTournamentByIdRequest(id);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch tournament'
      );
    }
  }
);

export const deleteTournamentById = createAsyncThunk(
  'tournament/deleteById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await tournamentAPI.deleteTournamentRequest(id);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete tournament'
      );
    }
  }
);