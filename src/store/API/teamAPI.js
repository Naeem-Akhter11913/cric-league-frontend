import axiosInstance from '../../api/axiosInstance';

export const createTeamRequest = payload => axiosInstance.post('/teams', payload).then((res) => res.data);

export const teamListRequest = payload => axiosInstance.get('/teams', { params: payload }).then((res) => res.data);

export const teamGetByIdRequest = id => axiosInstance.get(`/teams/${id}`).then((res) => res.data);

export const updateTeamRequest = ({ id, payload }) => axiosInstance.patch(`/teams/${id}`, payload).then((res) => res.data);

export const addPlayerRequest = ({ id, payload }) => axiosInstance.post(`/teams/${id}/players`, payload).then((res) => res.data);

export const listTeamPlayersRequest = id => axiosInstance.get(`/teams/${id}/players`).then((res) => res.data);
