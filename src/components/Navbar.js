import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-yellow-400 text-blue-900 px-6 py-4 shadow-md flex justify-between items-center">
      <div className="text-2xl font-bold tracking-wide">
        EthiCraft
      </div>
      <div className="space-x-6 text-lg">
        <Link
          to="/"
          className={`hover:underline ${
            location.pathname === '/' ? 'underline font-semibold' : ''
          }`}
        >
          Home
        </Link>
        <Link
          to="/register"
          className={`hover:underline ${
            location.pathname === '/register' ? 'underline font-semibold' : ''
          }`}
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
