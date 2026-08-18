

import axios from 'axios';

// Base axios instance for all API calls
const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1',
  baseURL: 'http://localhost:5000/api/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // <-- ADDED: required so the browser sends the httpOnly refresh cookie
});

// ---- Access token attach ----
// Kept in memory only. Refresh token is no longer handled here at all —
// it lives entirely in an httpOnly cookie set by the server, invisible to JS.
let accessToken = null;

export function setAccessToken(token) {           // <-- RENAMED from setTokens
  accessToken = token;
}

export function clearAccessToken() {               // <-- RENAMED from clearTokens
  accessToken = null;
}

export function getAccessToken() {                 // <-- ADDED (slice needs this now)
  return accessToken;
}

// getRefreshToken() REMOVED — nothing to get, JS never sees the refresh token anymore

axiosInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ---- Auto-refresh on 401 ----
// Queues concurrent requests that fail while a refresh is already in-flight,
// so we don't fire multiple /auth/refresh calls at once.
let isRefreshing = false;
let pendingQueue = [];

function resolvePendingQueue(error, token = null) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthEndpoint =
      originalRequest?.url?.includes('/auth/login') ||
      originalRequest?.url?.includes('/auth/register') ||
      originalRequest?.url?.includes('/auth/refresh');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // no `if (!refreshToken) throw` check anymore — we don't know client-side
        // whether the cookie exists; just ask the server and let it 401 if not
        const { data } = await axios.post(
          `${axiosInstance.defaults.baseURL}/auth/refresh`,
          {},                              // <-- CHANGED: empty body, no refreshToken to send
          { withCredentials: true }         // <-- ADDED: send the cookie on this raw axios call too
        );

        const newAccessToken = data.data.accessToken;
        setAccessToken(newAccessToken);     // <-- CHANGED: only setting access token now

        resolvePendingQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        resolvePendingQueue(refreshError, null);
        clearAccessToken();                 // <-- RENAMED
        window.dispatchEvent(new CustomEvent('auth:sessionExpired'));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;