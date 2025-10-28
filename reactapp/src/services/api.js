import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Helper function to get headers with token
const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Wrapper for axios requests with error handling
const apiRequest = async (method, url, data = null) => {
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${url}`,
      headers: getHeaders(),
    };
    
    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response;
  } catch (error) {
    // Handle 401 errors globally
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    throw error;
  }
};

// API methods
const api = {
  get: (url) => apiRequest('GET', url),
  post: (url, data) => apiRequest('POST', url, data),
  put: (url, data) => apiRequest('PUT', url, data),
  delete: (url) => apiRequest('DELETE', url),
};

export default api;

// const BASE_URL = 'https://8080-eeebbcdcdac333088014defeaefeone.premiumproject.examly.io/api';
