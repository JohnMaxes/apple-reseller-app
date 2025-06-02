import axiosInstance from "./axios";

export const updateUserInfo = (userId, payload) => {
  return axiosInstance.put(`/api/users/${userId}`, payload);
}