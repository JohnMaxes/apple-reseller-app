import axios from 'axios';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleRefreshToken = async (refreshToken) => {
  const response = await axios.post(`${BASE_URL}/api/refresh`, {
    refreshToken,
  });
  if (response.status === 200) {
    const { accessToken } = response.data;
    AsyncStorage.setItem('accessToken', accessToken);
    return accessToken;
  }
  return "";
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 200000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const newAccessToken = await handleRefreshToken(refreshToken);
      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;