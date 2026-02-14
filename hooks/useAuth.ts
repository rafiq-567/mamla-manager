'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await axios.post('/api/auth/login', { email, password });
          set({ 
            user: response.data.user, 
            isAuthenticated: true,
            isLoading: false 
          });
          toast.success('Login successful!');
        } catch (error: any) {
          set({ isLoading: false });
          toast.error(error.response?.data?.error || 'Login failed');
          throw error;
        }
      },

      register: async (data: any) => {
        set({ isLoading: true });
        try {
          const response = await axios.post('/api/auth/register', data);
          set({ 
            user: response.data.user, 
            isAuthenticated: true,
            isLoading: false 
          });
          toast.success('Registration successful!');
        } catch (error: any) {
          set({ isLoading: false });
          toast.error(error.response?.data?.error || 'Registration failed');
          throw error;
        }
      },

      logout: async () => {
        try {
          await axios.post('/api/auth/logout');
          set({ user: null, isAuthenticated: false });
          toast.success('Logged out successfully');
        } catch (error) {
          toast.error('Logout failed');
        }
      },

      fetchUser: async () => {
        set({ isLoading: true });
        try {
          const response = await axios.get('/api/auth/me');
          set({ 
            user: response.data.user, 
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);