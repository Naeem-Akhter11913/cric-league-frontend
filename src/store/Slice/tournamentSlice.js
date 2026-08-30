// tournamentSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
    createTournament,
    fetchTournament,
    updateTournament,
    fetchTournaments,
    fetchTournamentById,
    deleteTournamentById,
} from '../action/tournament.action';

const initialState = {
    tournament: null,
    list: [],
    tournamentCount: 0,
    totalPages: 0,
    selectedTournament: null,
    loading: false,
    error: null,
    success: null,
};

const tournamentSlice = createSlice({
    name: 'tournament',
    initialState,
    reducers: {
        clearTournamentStatus: (state) => {
            state.error = null;
            state.success = null;
        },
        clearSelectedTournament: (state) => {
            state.selectedTournament = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // create
            .addCase(createTournament.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(createTournament.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message || 'Tournament created';
                state.tournament = action.payload.data;
            })
            .addCase(createTournament.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // fetch single (own tournament)
            .addCase(fetchTournament.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTournament.fulfilled, (state, action) => {
                state.loading = false;
                state.tournament = action.payload.data;
            })
            .addCase(fetchTournament.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // tournamentSlice.js — add case
            .addCase(deleteTournamentById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(deleteTournamentById.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message || 'Tournament deleted';
                state.list = state.list.filter((t) => t._id !== action.payload.id);
                state.tournamentCount = Math.max(0, state.tournamentCount - 1);
            })
            .addCase(deleteTournamentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // update
            .addCase(updateTournament.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(updateTournament.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message || 'Tournament updated';
                state.tournament = action.payload.data;
            })
            .addCase(updateTournament.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // list
            .addCase(fetchTournaments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTournaments.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.data?.tournaments || [];
                state.tournamentCount = action.payload.data?.pagination?.total || 0;
                state.totalPages = action.payload.data?.pagination?.totalPages || 0;
            })
            .addCase(fetchTournaments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get by id
            .addCase(fetchTournamentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTournamentById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTournament = action.payload.data;
            })
            .addCase(fetchTournamentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearTournamentStatus, clearSelectedTournament } =
    tournamentSlice.actions;

export default tournamentSlice.reducer;