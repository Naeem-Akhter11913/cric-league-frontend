import { createAsyncThunk } from '@reduxjs/toolkit';
import * as scorerAPI from '../API/scorerAPI';

const thunk = (type, call, fallback) =>
  createAsyncThunk(type, async (arg, { rejectWithValue }) => {
    try {
      const body = await call(arg);
      return body.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || fallback);
    }
  });

export const fetchScorers = thunk('scorer/list', (params) => scorerAPI.fetchScorersRequest(params), 'Failed to load scorers');
export const fetchScorerOverview = thunk('scorer/overview', () => scorerAPI.fetchScorerOverviewRequest(), 'Failed to load scorer overview');
export const createScorer = thunk('scorer/create', (payload) => scorerAPI.createScorerRequest(payload), 'Failed to add scorer');
export const updateScorer = thunk('scorer/update', ({ id, payload }) => scorerAPI.updateScorerRequest(id, payload), 'Failed to update scorer');
export const removeScorer = thunk('scorer/remove', (id) => scorerAPI.removeScorerRequest(id), 'Failed to remove scorer');