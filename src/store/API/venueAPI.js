import axiosInstance from '../../api/axiosInstance';

export const createVenueRequest = payload => axiosInstance.post('/venues', payload).then((res) => res.data);