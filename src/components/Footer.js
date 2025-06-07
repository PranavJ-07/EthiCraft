// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white text-center py-3 text-sm">
      © {new Date().getFullYear()} EthiCraft Club. All rights reserved.
    </footer>
  );
};

export default Footer;
