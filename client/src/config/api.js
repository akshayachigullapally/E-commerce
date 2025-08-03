const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  products: `${API_BASE_URL}/products`,
  categories: `${API_BASE_URL}/categories`,
  cart: `${API_BASE_URL}/cart`,
  orders: `${API_BASE_URL}/cart/orders`,
  test: `${API_BASE_URL}/test`
};

export default API_BASE_URL;
