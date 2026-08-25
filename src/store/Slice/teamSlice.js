import { createSlice } from '@reduxjs/toolkit';
import { createTeam, teamList, teamGetById, updateTeam, addPlayerToTeam, listTeamPlayers } from '../action/teamActions';


const initialState = {
    team: null,
    list: [],
    selectedTeam: null,
    teamPlayers: [],
    loading: false,
    error: null,
    success: null
};

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        clearTeamError: (state) => {
            state.error = null;
        },
        clearTeamSuccess: (state) => {
            state.success = null
        },
        clearSelectedTeam: (state) => {
            state.selectedTeam = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Team
            .addCase(createTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message;
                state.team = action.payload.data;
            })
            .addCase(createTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Team List
            .addCase(teamList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(teamList.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.data;
            })
            .addCase(teamList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Team By Id
            .addCase(teamGetById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(teamGetById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTeam = action.payload.data;
            })
            .addCase(teamGetById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Team
            .addCase(updateTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.team = action.payload.data;
                state.success = action.payload.message;
            })
            .addCase(updateTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add Player To Team
            .addCase(addPlayerToTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPlayerToTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message;
                state.selectedTeam = action.payload.data;
            })
            .addCase(addPlayerToTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // List Team Players
            .addCase(listTeamPlayers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listTeamPlayers.fulfilled, (state, action) => {
                state.loading = false;
                state.teamPlayers = action.payload.data;
            })
            .addCase(listTeamPlayers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearTeamError, clearSelectedTeam, clearTeamSuccess } = teamSlice.actions;
export default teamSlice.reducer;