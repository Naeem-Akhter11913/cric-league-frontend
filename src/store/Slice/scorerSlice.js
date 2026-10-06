import { createSlice } from '@reduxjs/toolkit';
import { fetchScorers, fetchScorerOverview } from '../action/scorer.action';

const scorerSlice = createSlice({
  name: 'scorer',
  initialState: {
    list: { items: [], total: 0, loading: false, requestId: null },
    overview: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchScorers.pending, (state, action) => {
        state.list.loading = true;
        state.list.requestId = action.meta.requestId;
      })
      .addCase(fetchScorers.fulfilled, (state, action) => {
        if (state.list.requestId !== action.meta.requestId) return; // ignore out-of-order responses
        state.list.loading = false;
        state.list.items = action.payload.items;
        state.list.total = action.payload.total;
      })
      .addCase(fetchScorers.rejected, (state, action) => {
        if (state.list.requestId === action.meta.requestId) state.list.loading = false;
      })
      .addCase(fetchScorerOverview.fulfilled, (state, action) => {
        state.overview = action.payload;
      });
  },
});

export default scorerSlice.reducer;