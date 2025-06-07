import React, { useState } from 'react';
import axios from 'axios';
import { FaUsers, FaHandshake, FaRocket } from 'react-icons/fa';

const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const Register = () => {
  const [formData, setFormData] = useState({
    rollNo: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    prn: '',
    dob: '',
    mobileNo: '',
    department: '',
    division: '',
    gender: '',
    address: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (['firstName', 'middleName', 'lastName'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: capitalize(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8080/student', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      alert('Student registered successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed. Check backend logs for more info.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-4">
      {/* Form Section */}
      <div className="lg:w-4/5 bg-white text-gray-800 flex items-center justify-center p-8 shadow-2xl order-2 lg:order-1 rounded-lg">
        <div className="w-full max-w-3xl">
          <h2 className="text-4xl font-extrabold text-blue-700 drop-shadow-lg mb-2">Student Registration</h2>
          <p className="text-sm text-gray-600 mb-6">
            <span className="text-red-600 font-semibold">*</span> All fields are mandatory
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { key: 'firstName', label: 'First Name' },
                { key: 'middleName', label: 'Middle Name' },
                { key: 'lastName', label: 'Last Name' },
              ].map((field) => (
                <div key={field.key} className="relative">
                  <label htmlFor={field.key} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}*
                  </label>
                  <input
                    id={field.key}
                    name={field.key}
                    type="text"
                    value={formData[field.key]}
                    onChange={handleChange}
                    required={field.key !== 'middleName'}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              ))}
            </div>

            {/* Other Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Email*', name: 'email', type: 'email' },
                { label: 'Roll Number*', name: 'rollNo', type: 'text' },
                { label: 'PRN Number*', name: 'prn', type: 'text' },
                { label: 'Date of Birth*', name: 'dob', type: 'date' },
                { label: 'Mobile Number*', name: 'mobileNo', type: 'tel' },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={field.name}>
                    {field.label}
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              {/* Department Select */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="department">
                  Department*
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Select Department</option>
                  <option value="CE">CE</option>
                  <option value="IT">IT</option>
                  <option value="EnTC">EnTC</option>
                  <option value="AIDS">AIDS</option>
                  <option value="ECE">ECE</option>
                </select>
              </div>

              {/* Division Select */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="division">
                  Division*
                </label>
                <select
                  id="division"
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Select Division</option>
                  {[...Array(13)].map((_, i) => (
                    <option key={i} value={`FY-${i + 1}`}>{`FY-${i + 1}`}</option>
                  ))}
                </select>
              </div>

              {/* Gender Radio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender*</label>
                <div className="flex space-x-6">
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <label key={gender} className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleChange}
                        required
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Address Textarea */}
              <div className="md:col-span-2 relative">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
                  Address*
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg text-lg font-bold shadow-lg transition-all duration-300 transform hover:scale-[1.01]"
                type="submit"
              >
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Banner Section */}
      <div className="lg:w-1/3 flex flex-col items-center justify-center p-8 order-1 lg:order-2 bg-gradient-to-tr from-orange-400 via-yellow-400 to-orange-500 rounded-lg shadow-2xl text-white relative overflow-hidden lg:ml-4 mb-4 lg:mb-0">
        <div className="text-center z-10 relative">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to <br />
            <span style={{ color: 'rgb(0, 158, 234)' }}>Ethi</span>
            <span style={{ color: 'rgb(194, 18, 190)' }}>Craft</span>
            <span style={{ color: 'rgb(228, 236, 220)' }}>Club</span>
          </h1>
          <p className="text-lg font-semibold mb-6 drop-shadow-md">
            Guided by <span className="underline decoration-yellow-300">values</span>, Driven by{' '}
            <span className="underline decoration-yellow-300">purpose</span>.
          </p>

          <div className="mb-6 flex justify-center">
            <div className="bg-white rounded-full p-2 shadow-lg border-4 border-yellow-200">
              <img
                alt="EthiCraft Logo"
                className="rounded-full w-40 h-40 object-contain"
                src="/EthiCraft.png"
              />
            </div>
          </div>

          <div className="flex justify-center space-x-8 text-yellow-200 text-4xl">
            <FaUsers title="Community" className="hover:text-yellow-100 cursor-pointer transition-colors duration-300" />
            <FaHandshake title="Collaboration" className="hover:text-yellow-100 cursor-pointer transition-colors duration-300" />
            <FaRocket title="Innovation" className="hover:text-yellow-100 cursor-pointer transition-colors duration-300" />
          </div>
        </div>

        <div className="absolute top-10 left-5 w-24 h-24 rounded-full bg-yellow-200 opacity-20 -z-10"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-yellow-300 opacity-20 -z-10"></div>
      </div>
    </div>
  );
};

export default Register;
