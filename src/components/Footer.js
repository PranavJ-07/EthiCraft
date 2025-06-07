import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 text-white py-4 text-sm font-mono shadow-inner border-t border-blue-500/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto text-center px-4">
        <p className="tracking-wider text-blue-200">
          © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">EthiCraft Club</span>. All rights reserved.
        </p>
        <p className="text-xs text-blue-400 mt-1">
          Empowering Innovation | Built with ❤️ and React
        </p>
      </div>
    </footer>
  );
};

export default Footer;
