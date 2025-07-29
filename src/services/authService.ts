import api from './api';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types';

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    const authData = response.data;
    
    // Store token and user data
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify({
      email: authData.email,
      firstName: authData.firstName,
      lastName: authData.lastName,
      token: authData.token
    }));
    
    return authData;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/register', userData);
    const authData = response.data;
    
    // Store token and user data
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify({
      email: authData.email,
      firstName: authData.firstName,
      lastName: authData.lastName,
      token: authData.token
    }));
    
    return authData;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
};
