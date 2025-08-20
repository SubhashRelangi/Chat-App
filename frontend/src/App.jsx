import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

import { useAuthStore } from './store/useAuthStore.js';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const hideNavbarPaths = ['/login', '/signup'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#1e293b',
            },
          },
        }}
      />

      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;