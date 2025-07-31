import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.232.29:8080',
  
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // ✅ Correct key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
