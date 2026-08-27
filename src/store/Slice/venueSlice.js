import { createSlice } from "@reduxjs/toolkit";
import { venueTeam } from "../action/venue.action";




const initialState = {
    venue: null,
    list: [],
    selectedVenue: null,
    // teamPlayers: [],
    loading: false,
    error: null,
    success: null
};








const teamSlice = createSlice({
    name: 'venue',
    initialState,
    reducers: {
        clearVenueError: (state) => {
            state.error = null;
        },
        clearVenueSuccess: (state) => {
            state.success = null
        },
        clearVenueTeam: (state) => {
            state.selectedVenue = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Team
            .addCase(venueTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(venueTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message;
            })
            .addCase(venueTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { clearVenueError, clearVenueSuccess, clearVenueTeam } = teamSlice.actions;
export default teamSlice.reducer;

