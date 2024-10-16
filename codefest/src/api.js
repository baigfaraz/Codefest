// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Allow cookies for authentication
});

export const registerUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post('/users/auth', userData);
  return response.data;
};

export const logoutUser = async () => {
  await api.post('/users/logout');
};

export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};
