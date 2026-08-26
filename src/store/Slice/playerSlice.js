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
        clearPlayerSuccess: (state) => {
            state.success = null
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
                state.success = action.payload.message;
                state.profile = action.payload.data;
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
                state.profile = action.payload.data;
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
                state.profile = action.payload.data;
                state.success = action.payload.message;
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
                state.list = action.payload.data;
            })
            .addCase(playerList.rejected, (state, action) => {
                state.loading = false;
                // state.error = action.payload;
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

export const { clearPlayerError, clearSelectedPlayer, clearPlayerSuccess } = playerSlice.actions;
export default playerSlice.reducer;