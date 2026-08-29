import axiosInstance from '../../api/axiosInstance';

export const createVenueRequest = payload => axiosInstance.post('/venues', payload).then((res) => res.data);
export const listVenueRequest = payload => axiosInstance.get('/venues', payload).then((res) => res.data);
export const venueUpdateRequest = (payload, venueId) => axiosInstance.patch(`/venues/${venueId}`, payload).then((res) => res.data);
export const venueDeleteRequest = (venueId) => axiosInstance.delete(`/venues/${venueId}`).then((res) => res.data);