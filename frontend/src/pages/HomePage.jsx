import React from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5005/auth/logout', {}, { withCredentials: true });
      await logout(); // clears Zustand state
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed', { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold drop-shadow-lg">Welcome to HomePage</h1>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;