import { createSlice } from '@reduxjs/toolkit';
import { fetchMatches, fetchMatchStats, fetchMatchOptions } from '../action/match.action';

const emptyList = () => ({ items: [], total: 0, loading: false, requestId: null });

const matchSlice = createSlice({
  name: 'match',
  initialState: {
    lists: { live: emptyList(), upcoming: emptyList(), table: emptyList() },
    stats: null,
    options: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state, action) => {
        const l = state.lists[action.meta.arg.key];
        l.loading = true;
        l.requestId = action.meta.requestId;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        const l = state.lists[action.meta.arg.key];
        if (l.requestId !== action.meta.requestId) return; // ignore out-of-order responses
        l.loading = false;
        l.items = action.payload.items;
        l.total = action.payload.total;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        const l = state.lists[action.meta.arg.key];
        if (l.requestId === action.meta.requestId) l.loading = false;
      })
      .addCase(fetchMatchStats.fulfilled, (state, action) => { state.stats = action.payload; })
      .addCase(fetchMatchOptions.fulfilled, (state, action) => { state.options = action.payload; });
  },
});

export default matchSlice.reducer;