// import { createSlice } from '@reduxjs/toolkit';
// import { organizerList } from '../action/organizer.action';


// const initialState = {
//     organizer: null,
//     organizerList: [],
//     selectedOrganizer: null,
//     loading: false,
//     error: null,
//     success: null
// };

// const organizerSlice = createSlice({
//     name: 'organizer',
//     initialState,
//     reducers: {
//         clearOrganizerError: (state) => {
//             state.error = null;
//         },
//         clearOrganizerSuccess: (state) => {
//             state.success = null
//         },
//         clearSelectedOrganizer: (state) => {
//             state.selectedPlayer = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder


//             // Player List
//             .addCase(organizerList.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(organizerList.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.organizerList = action.payload.data;
//             })
//             .addCase(organizerList.rejected, (state, action) => {
//                 state.loading = false;
//                 // state.error = action.payload;
//             })

//     },
// });

// export const { clearOrganizerError, clearOrganizerSuccess, clearSelectedOrganizer } = organizerSlice.actions;
// export default organizerSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';
import { organizerList, createPlayer, fetchOrgPlayers, fetchOrgPlayerStats } from '../action/organizer.action';

const initialState = {
    organizer: null,
    organizerList: [],
    players: [],              // players added in this session (use for instant UI update)
    selectedOrganizer: null,
    loading: false,           // list loading
    creating: false,          // create-player loading (separate so the list doesn't flash a spinner)
    error: null,
    success: null,
    orgPlayers: [],
    orgPlayersTotal: 0,
    orgPlayersLoading: false,
    orgPlayersRequestId: null,
    playerStats: null,
};

const organizerSlice = createSlice({
    name: 'organizer',
    initialState,
    reducers: {
        clearOrganizerError: (state) => {
            state.error = null;
        },
        clearOrganizerSuccess: (state) => {
            state.success = null;
        },
        clearSelectedOrganizer: (state) => {
            state.selectedOrganizer = null; // was selectedPlayer, which didn't exist in state
        },
    },
    extraReducers: (builder) => {
        builder
            // Organizer List
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
                state.error = action.payload || action.error?.message || 'Failed to fetch organizers';
            })

            // Create Player
            .addCase(createPlayer.pending, (state) => {
                state.creating = true;
                state.error = null;
                state.success = null;
            })
            .addCase(createPlayer.fulfilled, (state, action) => {
                state.creating = false;
                state.success = action?.payload?.message || 'Player created';
                // state.players.unshift(action.payload.data);
            })
            .addCase(createPlayer.rejected, (state, action) => {
                state.creating = false;
                state.error = action.payload || action.error?.message || 'Failed to add player';
            })


            .addCase(fetchOrgPlayers.pending, (state, action) => {
                state.orgPlayersLoading = true;
                state.orgPlayersRequestId = action.meta.requestId;
            })
            .addCase(fetchOrgPlayers.fulfilled, (state, action) => {
                if (state.orgPlayersRequestId !== action.meta.requestId) return; // ignore out-of-order responses
                state.orgPlayersLoading = false;
                state.orgPlayers = action.payload.items;
                state.orgPlayersTotal = action.payload.total;
            })
            .addCase(fetchOrgPlayers.rejected, (state, action) => {
                if (state.orgPlayersRequestId !== action.meta.requestId) return;
                state.orgPlayersLoading = false;
            })
            .addCase(fetchOrgPlayerStats.fulfilled, (state, action) => {
                state.playerStats = action.payload;
            })
    },
});

export const { clearOrganizerError, clearOrganizerSuccess, clearSelectedOrganizer } = organizerSlice.actions;
export default organizerSlice.reducer;