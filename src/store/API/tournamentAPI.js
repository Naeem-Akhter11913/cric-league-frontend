// tournamentAPI.js
import axiosInstance from '../../api/axiosInstance';

export const createTournamentRequest = (payload) =>
  axiosInstance.post('/tournaments', payload).then((res) => res.data);

export const getTournamentRequest = (id) =>
  axiosInstance
    .get('/tournaments/single', { params: id ? { id } : {} })
    .then((res) => res.data);

export const updateTournamentRequest = (payload) =>
  axiosInstance.patch('/tournaments', payload).then((res) => res.data);

export const listTournamentsRequest = (params) =>
  axiosInstance.get('/tournaments', { params }).then((res) => res.data);

export const getTournamentByIdRequest = (id) =>
  axiosInstance.get(`/tournaments/${id}`).then((res) => res.data);


export const deleteTournamentRequest = (id) =>
  axiosInstance.delete(`/tournaments/${id}`).then((res) => res.data);