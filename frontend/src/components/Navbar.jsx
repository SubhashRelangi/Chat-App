import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, User, LogOut, Settings } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore.js';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const hideNavbarPaths = ['/login', '/signup'];
  if (hideNavbarPaths.includes(location.pathname)) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full px-4 sm:px-8 py-5 bg-base-100 shadow-md flex items-center justify-between border-b border-base-300">
      {/* Left: Chat Logo */}
      <Link to="/" className="flex items-center gap-2 text-base-content hover:text-primary transition">
        <MessageCircle className="size-7" />
        <span className="font-semibold text-xl">ChatApp</span>
      </Link>

      {/* Right: Icons */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Settings */}
        <Link
          to="/settings"
          className="flex items-center gap-2 border border-base-300 rounded-full px-3 py-2 hover:border-primary transition"
        >
          <Settings className="size-5" />
          <span className="hidden md:inline text-sm">Settings</span>
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className="flex items-center gap-2 border border-base-300 rounded-full px-3 py-2 hover:border-primary transition"
        >
          <User className="size-5" />
          <span className="hidden md:inline text-sm">Profile</span>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 border border-base-300 rounded-full px-3 py-2 hover:border-error transition"
        >
          <LogOut className="size-5" />
          <span className="hidden md:inline text-sm">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;