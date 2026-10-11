// import axiosInstance from '../../api/axiosInstance';

// export const getPointsTableRequest = (params) =>
//   axiosInstance.get('/points-table', { params }).then((r) => r.data);


import axiosInstance from '../../api/axiosInstance';

export const getPointsTableRequest = (params) =>
  axiosInstance.get('/points-table', { params });