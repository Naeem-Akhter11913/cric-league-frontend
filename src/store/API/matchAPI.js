import axiosInstance from '../../api/axiosInstance';

export const fetchMatchesRequest = (params) => axiosInstance.get('/matches', { params }).then((r) => r.data);
export const fetchMatchStatsRequest = () => axiosInstance.get('/matches/stats').then((r) => r.data);
export const fetchMatchOptionsRequest = () => axiosInstance.get('/matches/options').then((r) => r.data);
export const createMatchRequest = (payload) => axiosInstance.post('/matches', payload).then((r) => r.data);
export const updateMatchRequest = (id, payload) => axiosInstance.put(`/matches/${id}`, payload).then((r) => r.data);
export const cancelMatchRequest = (id, reason) => axiosInstance.put(`/matches/${id}/cancel`, { reason }).then((r) => r.data);
