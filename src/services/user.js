import axiosInstance from "./axios";

export const updateUserInfo = (userId, payload) => {
  return axiosInstance.put(`/api/users/${userId}`, payload);
}

export const createShippingAddress = (accessToken, payload) => {
  return axiosInstance.post(`/api/users/shippingAddress`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export const getAllShippingAddresses = (accessToken) => {
  return axiosInstance.get(`/api/users/shippingAddress`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}