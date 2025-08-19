import { create } from 'zustand';
import axiosInstance from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoading: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      if (res.status === 200) {
        set({ authUser: res.data.user });
      } else {
        set({ authUser: null });
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (userData) => {
    set({ isSigningUp: true });
    const toastId = toast.loading('Signing you up...');

    try {
      const res = await axiosInstance.post('/auth/signup', userData);
      if (res.status === 201) {
        setTimeout(() => {
          set({ authUser: res.data.user });
          toast.success('Signup completed!', { id: toastId });
        }, 2000);
      } else {
        toast.error('Signup failed', { id: toastId });
      }
    } catch (error) {
      toast.error('Server error', { id: toastId });
      console.error('Signup error:', error);
    } finally {
      setTimeout(() => {
        set({ isSigningUp: false });
      }, 2000);
    }
  },

  login: async (credentials) => {
    set({ isLoading: true });
    const toastId = toast.loading('Logging you in...');

    try {
      const res = await axiosInstance.post('/auth/login', credentials);
      if (res.status === 200) {
        setTimeout(() => {
          set({ authUser: res.data.user });
          toast.success('Login completed!', { id: toastId });
        }, 2000);
      } else {
        toast.error('Login failed', { id: toastId });
      }
    } catch (error) {
      toast.error('Server error', { id: toastId });
      console.error('Login error:', error);
    } finally {
      setTimeout(() => {
        set({ isLoading: false });
      }, 2000);
    }
  },

  logout: async () => {
    const toastId = toast.loading('Logging you out...');

    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed', { id: toastId });
      return;
    }

    setTimeout(() => {
      set({ authUser: null });
      toast.success('Logout completed!', { id: toastId });
    }, 2000);
  },

  resetAuthState: () =>
    set({
      isSigningUp: false,
      isLoading: false,
      isUpdatingProfile: false,
    }),
}));