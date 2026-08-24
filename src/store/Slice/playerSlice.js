import { createSlice } from '@reduxjs/toolkit';
import { createProfile, getMyProfile, playerGetById, playerList, updateMyProfile } from '../action/player.action';


const initialState = {
    profile: null,
    list: [],
    selectedPlayer: null,
    loading: false,
    error: null,
    success: null
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        clearPlayerError: (state) => {
            state.error = null;
        },
        clearSelectedPlayer: (state) => {
            state.selectedPlayer = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Profile
            .addCase(createProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(createProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get My Profile
            .addCase(getMyProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(getMyProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update My Profile
            .addCase(updateMyProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMyProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(updateMyProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Player List
            .addCase(playerList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(playerList.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(playerList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Player By Id
            .addCase(playerGetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(playerGetById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedPlayer = action.payload;
            })
            .addCase(playerGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearPlayerError, clearSelectedPlayer } = playerSlice.actions;
export default playerSlice.reducer;