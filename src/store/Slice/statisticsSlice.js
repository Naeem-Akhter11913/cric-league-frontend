
import { createSlice } from "@reduxjs/toolkit";
import { getStatisticsTable } from "../action/statistics.action";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    clearStatistics: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatisticsTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatisticsTable.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getStatisticsTable.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to load statistics";
      });
  },
});

export const { clearStatistics } = statisticsSlice.actions;

export default statisticsSlice.reducer;
