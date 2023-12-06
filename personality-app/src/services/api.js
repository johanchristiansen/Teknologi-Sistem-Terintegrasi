// src/services/api.js
import axios from 'axios';

const api1 = axios.create({
  baseURL: 'https://customizefragrance.azurewebsites.net/', 
});
const token = localStorage.getItem('accessToken');
  if (token) {
  api1.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

const api2 = axios.create({
  baseURL: 'https://loanrecommendationapi.azurewebsites.net/', 
});
const token2 = localStorage.getItem('externalAccessToken');
  if (token2) {
  api2.defaults.headers.common['Authorization'] = `Bearer ${token2}`;
  }
const api = {api1,api2}
export default api;
