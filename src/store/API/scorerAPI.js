import axiosInstance from '../../api/axiosInstance';

export const fetchScorersRequest = (params) => axiosInstance.get('/scorers', { params }).then((r) => r.data);
export const fetchScorerOverviewRequest = () => axiosInstance.get('/scorers/overview').then((r) => r.data);
export const createScorerRequest = (payload) => axiosInstance.post('/scorers', payload).then((r) => r.data);
export const updateScorerRequest = (id, payload) => axiosInstance.patch(`/scorers/${id}`, payload).then((r) => r.data);
export const removeScorerRequest = (id) => axiosInstance.delete(`/scorers/${id}`).then((r) => r.data);