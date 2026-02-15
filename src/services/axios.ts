import axios from 'axios';

const baseURL = 'http://localhost:8000';

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use((request) => {
  return request;
});

axiosInstance.interceptors.response.use((response) => {
  if (response.status === 401) {
    location.href = '/login';
  }
  return response;
});

export default axiosInstance;
