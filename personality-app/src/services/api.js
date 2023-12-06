// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://customizefragrance.azurewebsites.net/', 
});
const token = localStorage.getItem('accessToken');
  if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
export default api;
