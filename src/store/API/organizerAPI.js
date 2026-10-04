import axiosInstance from '../../api/axiosInstance';


// export const createOrganizerRequest = payload => axiosInstance.post('/organizer', payload).then((res) => res.data);

// export const getOrganizerRequest = payload => axiosInstance.get("/organizer/me", payload).then(res => res.data);

// export const updateOrganizerRequest = payload => axiosInstance.patch("/organizer/me", payload).then(res => res.data);


export const organizerListRequest = payload => axiosInstance.get('/organizer', { params: payload }).then((res) => res.data);
export const organizerPlyerCreateRequest = payload => axiosInstance.post('/organizer/players', payload).then((res) => res.data);

// export const organizerGetByIdRequest = id => axiosInstance.get(`/organizer/${id}`).then((res) => res.data);

export const fetchOrgPlayersRequest = (params) =>
  axiosInstance.get('/organizer/players', { params }).then((res) => res.data);

export const fetchOrgPlayerStatsRequest = () =>
  axiosInstance.get('/organizer/players/stats').then((res) => res.data);

export const removeOrgPlayerRequest = (id) =>
  axiosInstance.delete(`/organizer/players/${id}`).then((res) => res.data);