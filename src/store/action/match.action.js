import { createAsyncThunk } from '@reduxjs/toolkit';
import * as matchAPI from '../API/matchAPI';

const thunk = (type, call, fallback) =>
    createAsyncThunk(type, async (arg, { rejectWithValue }) => {
        try {
            const body = await call(arg);
            return body.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || fallback);
        }
    });


// arg: { key: 'live' | 'upcoming' | 'table', params }
export const fetchMatches = thunk('match/fetch', ({ params }) => matchAPI.fetchMatchesRequest(params), 'Failed to load matches');
export const fetchMatchStats = thunk('match/stats', () => matchAPI.fetchMatchStatsRequest(), 'Failed to load match stats');
export const fetchMatchOptions = thunk('match/options', () => matchAPI.fetchMatchOptionsRequest(), 'Failed to load form options');
export const createMatch = thunk('match/create', (payload) => matchAPI.createMatchRequest(payload), 'Failed to schedule match');
export const updateMatch = thunk('match/update', ({ id, payload }) => matchAPI.updateMatchRequest(id, payload), 'Failed to update match');
export const cancelMatch = thunk('match/cancel', ({ id, reason }) => matchAPI.cancelMatchRequest(id, reason), 'Failed to cancel match');

