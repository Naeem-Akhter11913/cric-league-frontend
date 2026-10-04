import axiosInstance from '../../api/axiosInstance';

export const fetchPlayingXIRequest = (params) =>
  axiosInstance.get('/playing/playing-xi', { params }).then((res) => res.data);

export const savePlayingXIRequest = (payload) =>
  axiosInstance.post('/playing/playing-xi', payload).then((res) => res.data);

export const fetchPlayingXIListRequest = (params) =>
  axiosInstance.get('/playing/playing-xi/list', { params }).then((res) => res.data);

export const deletePlayingXIRequest = (id) =>
  axiosInstance.delete(`/playing/playing-xi/${id}`).then((res) => res.data);