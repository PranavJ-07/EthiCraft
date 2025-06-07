// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaHandshake, FaRocket } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to <span className="text-sky-400">Ethi</span>
          <span style={{color : 'rgb(237, 6, 197)'}}>Craft</span> Club
        </h1>
        <p className="text-lg md:text-xl mb-8">
          A space where innovation meets collaboration. Register today to join our vibrant community!
        </p>

        <div className="flex justify-center space-x-8 text-4xl text-yellow-300 mb-10">
          <FaUsers title="Community" />
          <FaHandshake title="Collaboration" />
          <FaRocket title="Innovation" />
        </div>

        <Link to="/register">
          <button className="bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:bg-yellow-300 transition duration-300">
            Register Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
