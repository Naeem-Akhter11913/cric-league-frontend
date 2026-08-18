import axiosInstance from '../../api/axiosInstance';

// Thin wrapper functions around your backend's /auth routes.
// Kept separate from the slice so they're easy to unit test / reuse.

export const registerRequest = (payload) =>
  axiosInstance.post('/auth/register', payload).then((res) => res.data.data);
// payload: { name, email, password, phone?, role }

export const loginRequest = (payload) =>
  axiosInstance.post('/auth/login', payload).then((res) => res.data.data);
// payload: { email, password }

export const refreshRequest = (refreshToken) =>
  axiosInstance.post('/auth/refresh', { refreshToken }).then((res) => res.data.data);

export const logoutRequest = (refreshToken) =>
  axiosInstance.post('/auth/logout', { refreshToken }).then((res) => res.data);
