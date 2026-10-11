
import axiosInstance from '../../api/axiosInstance';

export const getStatisticsRequest = (params) =>
  axiosInstance.get('/statistics', { params });