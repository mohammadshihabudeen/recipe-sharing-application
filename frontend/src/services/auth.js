// src/services/auth.js
import api from './api';

export const login = async (username, password) => {
    const response = await api.post('auth/token/', { username, password });
    return response.data;
};

export const refreshToken = async (refreshToken) => {
    const response = await api.post('auth/token/refresh/', { refresh: refreshToken });
    return response.data;
};
