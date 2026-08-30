import { createSlice } from "@reduxjs/toolkit";
import { allVenueList, venueDelete, venueList, venueTeam, venueUpdate } from "../action/venue.action";




const initialState = {
    venue: null,
    list: [],
    venueAllList:[],
    venueCount: 0,
    totalPages: 0,
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

            // Get Vanue in List
            .addCase(venueList.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(venueList.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.data.data;
                state.venueCount = action.payload.data.totalCount;
                state.totalPages = action.payload.data.totalPages;
            })
            .addCase(venueList.rejected, (state) => {
                state.loading = false;
            })
            .addCase(allVenueList.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(allVenueList.fulfilled, (state, action) => {
                state.loading = false;
                state.venueAllList = action.payload.data;
            })
            .addCase(allVenueList.rejected, (state) => {
                state.loading = false;
            })

            // Update Venue
            .addCase(venueUpdate.pending, state => {
                state.loading = true;
            })
            .addCase(venueUpdate.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message
            })
            .addCase(venueUpdate.rejected, state => {
                state.loading = false;
            })
            // Deleting Venue
            .addCase(venueDelete.pending, state => {
                state.loading = true;
            })
            .addCase(venueDelete.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message
            })
            .addCase(venueDelete.rejected, state => {
                state.loading = false;
            })
    },
});

export const { clearVenueError, clearVenueSuccess, clearVenueTeam } = teamSlice.actions;
export default teamSlice.reducer;

