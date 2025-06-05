import axiosInstance from "./axios";

export const getAllVouchers = () => {
  return axiosInstance.get(`/api/vouchers`);
}

export const getVoucherByCode = (code) => {
  return axiosInstance.get(`/api/vouchers/${code}`);
}

export const createVoucher = (payload) => {
  return axiosInstance.post(`/api/vouchers`, payload);
}
