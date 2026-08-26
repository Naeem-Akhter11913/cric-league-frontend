import { createSlice } from '@reduxjs/toolkit';
import { organizerList } from '../action/organizer.action';


const initialState = {
    organizer: null,
    organizerList: [],
    selectedOrganizer: null,
    loading: false,
    error: null,
    success: null
};

const organizerSlice = createSlice({
    name: 'organizer',
    initialState,
    reducers: {
        clearOrganizerError: (state) => {
            state.error = null;
        },
        clearOrganizerSuccess: (state) => {
            state.success = null
        },
        clearSelectedOrganizer: (state) => {
            state.selectedPlayer = null;
        },
    },
    extraReducers: (builder) => {
        builder


            // Player List
            .addCase(organizerList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(organizerList.fulfilled, (state, action) => {
                state.loading = false;
                state.organizerList = action.payload.data;
            })
            .addCase(organizerList.rejected, (state, action) => {
                state.loading = false;
                // state.error = action.payload;
            })

    },
});

export const { clearOrganizerError, clearOrganizerSuccess, clearSelectedOrganizer } = organizerSlice.actions;
export default organizerSlice.reducer;