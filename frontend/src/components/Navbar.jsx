import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, User, LogOut, Palette } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore.js';
import { useUIStore } from '../store/useUIStore.js';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [theme, setTheme] = useState('cupcake');
  const { toggleSidebar } = useUIStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const hideNavbarPaths = ['/login', '/signup'];
  if (hideNavbarPaths.includes(location.pathname)) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full px-4 sm:px-8 py-5 bg-base-100 shadow-md flex items-center justify-between border-b border-base-300">
      {/* Left: Chat Logo */}
      <div onClick={toggleSidebar} className="flex items-center gap-2 text-base-content hover:text-primary transition sm:hidden cursor-pointer">
        <MessageCircle className="size-7" />
        <span className="font-semibold text-xl">ChatApp</span>
      </div>
      <Link to="/" className="hidden sm:flex items-center gap-2 text-base-content hover:text-primary transition">
        <MessageCircle className="size-7" />
        <span className="font-semibold text-xl">ChatApp</span>
      </Link>

      {/* Right: Icons */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Themes Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="flex items-center gap-2 border border-base-300 rounded-full px-3 py-2 hover:border-primary transition">
            <Palette className="size-5" />
            <span className="hidden md:inline text-sm">Themes</span>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={() => setTheme('light')}>Light</a></li>
            <li><a onClick={() => setTheme('dark')}>Dark</a></li>
            <li><a onClick={() => setTheme('cupcake')}>Cupcake</a></li>
          </ul>
        </div>

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