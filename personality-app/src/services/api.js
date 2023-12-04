// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', 
});
const token = localStorage.getItem('accessToken');
  if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
export default api;
