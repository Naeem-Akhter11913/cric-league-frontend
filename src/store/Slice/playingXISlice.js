import { createSlice } from '@reduxjs/toolkit';
import { fetchPlayingXI, savePlayingXI, fetchPlayingXIList, deletePlayingXI } from '../action/playingXI.action';

const initialState = {
  current: null,      // the saved XI for the selected team + format (or null)
  loading: false,     // fetching the saved XI
  saving: false,      // saving the XI
  error: null,
  requestId: null,    // id of the latest fetch, so late responses from an older one are ignored
  list: [],
  total: 0,
  listLoading: false,
};

const playingXISlice = createSlice({
  name: 'playingXI',
  initialState,
  reducers: {
    clearPlayingXI: (state) => {
      state.current = null;
      state.error = null;
    },
    clearPlayingXIError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPlayingXI.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchPlayingXI.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return; // stale response
        state.loading = false;
        state.current = action.payload ?? null;
      })
      .addCase(fetchPlayingXI.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;
        state.loading = false;
        state.error = action.payload || action.error?.message || 'Failed to load Playing XI';
      })

      // Save
      .addCase(savePlayingXI.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(savePlayingXI.fulfilled, (state, action) => {
        state.saving = false;
        state.current = action.payload;
      })
      .addCase(savePlayingXI.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || action.error?.message || 'Failed to save Playing XI';
      })

      // extraReducers: add
      .addCase(fetchPlayingXIList.pending, (state) => {
        state.listLoading = true;
      })
      .addCase(fetchPlayingXIList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchPlayingXIList.rejected, (state, action) => {
        state.listLoading = false;
        state.error = action.payload || 'Failed to load Playing XIs';
      })

      .addCase(deletePlayingXI.fulfilled, (state, action) => {
        state.list = state.list.filter((x) => x._id !== action.payload);
        state.total = Math.max(0, state.total - 1);
        if (state.current?._id === action.payload) state.current = null;
      })
  },
});

export const { clearPlayingXI, clearPlayingXIError } = playingXISlice.actions;
export default playingXISlice.reducer;