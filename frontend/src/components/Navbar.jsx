import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const hideNavbarPaths = ['/login', '/signup'];
  if (hideNavbarPaths.includes(location.pathname)) return null;

  return (
    <nav className="w-full px-8 py-5 bg-white/10 backdrop-blur-md shadow-md flex items-center justify-between border-b border-white/20">
      {/* Left: Chat Logo */}
      <Link to="/" className="flex items-center gap-2 text-white hover:text-blue-300 transition">
        <MessageCircle className="size-7" />
        <span className="font-semibold text-xl">ChatApp</span>
      </Link>

      {/* Right: Profile Icon with Border */}
      <Link
        to="/profile"
        className="border border-white/30 rounded-full p-2 hover:border-blue-400 transition"
      >
        <User className="size-6 text-white" />
      </Link>
    </nav>
  );
};

export default Navbar;