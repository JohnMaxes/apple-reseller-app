import axiosInstance from "./axios";

export const createOrder = async (orderData, accessToken) => {
  return axiosInstance.post(`/api/orders`, orderData, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const getOrders = async (accessToken) => {
  return axiosInstance.get(`/api/orders`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}