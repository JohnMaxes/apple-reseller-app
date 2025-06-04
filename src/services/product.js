import axiosInstance from "./axios";

export const getProductBySKU = (sku) => {
  return axiosInstance.get(`/api/products/${sku}`);
}

export const getProductsByName = (productName) => {
  return axiosInstance.get(`/api/products/detail/${productName}`);
}

export const getProductsByCategory = (category) => {
  return axiosInstance.get(`/api/products/category/${category}`);
}

export const getAllProducts = () => {
  return axiosInstance.get(`/api/products`);
}

export const createProduct = (payload) => {
  return axiosInstance.post(`/api/products`, payload);
}

export const updateProduct = (sku, payload) => {
  return axiosInstance.put(`/api/products/${sku}`, payload);
}

export const deleteProduct = (sku) => {
  return axiosInstance.delete(`/api/products/${sku}`);
}