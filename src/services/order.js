import axiosInstance from "./axios";

export const createOrder = async (orderData) => {
  return axiosInstance.post(`/api/orders`, orderData);
};
