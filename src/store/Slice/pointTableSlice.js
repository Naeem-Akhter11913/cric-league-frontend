
import { createSlice } from '@reduxjs/toolkit';
import { getPointsTable } from '../action/pointsTableAction';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const pointsTableSlice = createSlice({
  name: 'pointtable',
  initialState,
  reducers: {
    clearPointsTable: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPointsTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPointsTable.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getPointsTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load point table data';
      });
  },
});

export const { clearPointsTable } = pointsTableSlice.actions;

export default pointsTableSlice.reducer;
