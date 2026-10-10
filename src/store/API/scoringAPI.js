import axiosInstance from '../../api/axiosInstance';

const get = (url) => axiosInstance.get(url).then((r) => r.data);
const post = (url, body) => axiosInstance.post(url, body).then((r) => r.data);

export const getState = (id) => get(`/scoring/${id}/state`);
export const recordToss = (id, body) => post(`/scoring/${id}/toss`, body);
export const startInnings = (id, body) => post(`/scoring/${id}/innings/start`, body);
export const selectBatter = (id, playerId) => post(`/scoring/${id}/batter`, { playerId });
export const selectBowler = (id, playerId) => post(`/scoring/${id}/bowler`, { playerId });
export const recordBall = (id, body) => post(`/scoring/${id}/ball`, body);
export const undoBall = (id) => axiosInstance.delete(`/scoring/${id}/ball/last`).then((r) => r.data);