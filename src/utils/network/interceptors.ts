import axios from 'axios';
import { NETWORK_TIMEOUT } from '@/config/constants';

const request = axios.create({
  timeout: NETWORK_TIMEOUT,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    if (response?.status === 200) {
      return response.data;
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default request;
