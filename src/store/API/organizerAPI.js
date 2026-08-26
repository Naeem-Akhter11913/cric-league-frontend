import axiosInstance from '../../api/axiosInstance';


// export const createOrganizerRequest = payload => axiosInstance.post('/organizer', payload).then((res) => res.data);

// export const getOrganizerRequest = payload => axiosInstance.get("/organizer/me", payload).then(res => res.data);

// export const updateOrganizerRequest = payload => axiosInstance.patch("/organizer/me", payload).then(res => res.data);


export const organizerListRequest = payload => axiosInstance.get('/organizer', { params: payload }).then((res) => res.data);

// export const organizerGetByIdRequest = id => axiosInstance.get(`/organizer/${id}`).then((res) => res.data);

