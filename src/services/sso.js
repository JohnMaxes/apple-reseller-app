import axiosInstance from "./axios";

export const login = (payload) => {
  return axiosInstance.post(`/api/login`, payload);
}

export const loginGoogle = (payload) => {
  return axiosInstance.post(`/api/login/google`, payload);
}

export const loginFacebook = (payload) => {
  return axiosInstance.post(`/api/login/facebook`, payload);
}

export const register = (payload) => {
  return axiosInstance.post(`/api/register`, payload);
}

export const sendVerifiCode = (payload) => {
  return axiosInstance.post(`/api/forgot/request`, payload);
}

export const verifyCode = (payload) => {
  return axiosInstance.post(`/api/forgot/verify`, payload);
}

export const resetPassword = (payload) => {
  return axiosInstance.post(`/api/forgot/reset`, payload);
}