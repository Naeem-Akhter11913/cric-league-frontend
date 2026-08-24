import axiosInstance from '../../api/axiosInstance';


export const createProfileRequest = payload => axiosInstance.post('/players', payload).then((res) => res.data);

export const getMyProfileRequest = payload => axiosInstance.get("/players/me", payload).then(res => res.data);

export const updateMyProfileRequest = payload => axiosInstance.patch("/players/me", payload).then(res => res.data);


export const playerListRequest = payload => axiosInstance.get('/players', { payload }).then((res) => res.data);

export const playerGetByIdRequest = id => axiosInstance.get(`/players/${id}`).then((res) => res.data);

