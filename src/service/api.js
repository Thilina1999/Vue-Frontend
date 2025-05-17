// src/api/api.js
import axios from 'axios';
const url = import.meta.env.VITE_API_BASE_URL

const apiClient = axios.create({
  baseURL: url,  // Your Flask API base URL
  headers: {
    'Content-Type': 'application/json'
  },
});

export default apiClient;
