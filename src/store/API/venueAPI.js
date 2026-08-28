import axiosInstance from '../../api/axiosInstance';

export const createVenueRequest = payload => axiosInstance.post('/venues', payload).then((res) => res.data);
export const listVenueRequest = payload => axiosInstance.get('/venues', payload).then((res) => res.data);