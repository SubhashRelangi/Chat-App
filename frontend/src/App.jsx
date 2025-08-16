import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App