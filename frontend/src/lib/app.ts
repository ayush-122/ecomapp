import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data.data;
};

export const fetchCart = async (userId: string) => {
  const response = await api.get(`/cart/${userId}`);
  return response.data.data;
};

export const addToCart = async (productId: string, userId: string) => {
  const response = await api.post('/cart/add', { productId, userId });
  return response.data.data;
};

export const updateCartItem = async (id: string, quantity: number) => {
  const response = await api.put(`/cart/${id}`, { quantity });
  return response.data.data;
};

export const removeFromCart = async (id: string) => {
  const response = await api.delete(`/cart/${id}`);
  return response.data;
};