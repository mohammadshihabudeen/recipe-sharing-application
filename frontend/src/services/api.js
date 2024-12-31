// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/', // Adjust the base URL according to your Django server
});

export default api;
