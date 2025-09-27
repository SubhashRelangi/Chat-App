import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client'; // Import io from socket.io-client

import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';

import { useAuthStore } from './store/useAuthStore.js';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, setSocket, onlineUsers } = useAuthStore(); // Destructure setSocket and onlineUsers
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Socket.IO connection and online users handling
  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:5005', {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket); // Set the socket instance in the auth store

      socket.on('getOnlineUsers', (users) => {
        useAuthStore.setState({ onlineUsers: users });
      });

      return () => {
        socket.disconnect();
        setSocket(null); // Clear socket on disconnect
      };
    }
  }, [authUser, setSocket]); // Re-run effect when authUser or setSocket changes

  const hideNavbarPaths = ['/login', '/signup'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  console.log("Auth user:", authUser);

  return (
    <div data-theme='cupcake' className='h-screen flex flex-col'>
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

      <div className={`flex-1 flex ${isProfilePage ? 'overflow-y-auto' : 'overflow-hidden'}`}>
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;