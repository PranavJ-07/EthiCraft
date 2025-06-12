import React, { useState } from 'react';
import axios from 'axios';
import {FaRocket } from 'react-icons/fa';

// Email & phone validation, capitalization remain unchanged
const emailIsValid = (email) => /\S+@\S+\.\S+/.test(email);
const phoneIsValid = (phone) => /^\d{10}$/.test(phone);

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

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName.trim()) tempErrors.firstName = 'First Name is required.';
    if (!formData.lastName.trim()) tempErrors.lastName = 'Last Name is required.';
    if (!emailIsValid(formData.email)) tempErrors.email = 'Invalid email address.';
    if (!formData.rollNo.trim()) tempErrors.rollNo = 'Roll Number is required.';
    if (!formData.prn.trim()) tempErrors.prn = 'PRN Number is required.';
    if (!formData.dob) tempErrors.dob = 'Date of Birth is required.';
    if (!phoneIsValid(formData.mobileNo)) tempErrors.mobileNo = 'Enter a valid 10-digit mobile number.';
    if (!formData.department) tempErrors.department = 'Department is required.';
    if (!formData.division) tempErrors.division = 'Division is required.';
    if (!formData.gender) tempErrors.gender = 'Gender is required.';
    if (!formData.address.trim()) tempErrors.address = 'Address is required.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' }));
    if (['firstName', 'middleName', 'lastName'].includes(name)) {
      setFormData((prev) => ({ ...prev, [name]: capitalize(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSuccess(false);
    try {
      await axios.post('http://localhost:8080/student', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccess(true);
      setFormData({
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
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed. Check backend logs for more info.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-6">
      {/* Form Section */}
      <div className="lg:w-4/5 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-10 order-2 lg:order-1 border border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-cyan-400 bg-clip-text text-transparent mb-4 drop-shadow-md">
            Student Registration
          </h2>
          <p className="text-sm text-gray-600 mb-8 tracking-wide font-semibold">
            <span className="text-red-600">*</span> All fields are mandatory.
          </p>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { key: 'firstName', label: 'First Name' },
                { key: 'middleName', label: 'Middle Name' },
                { key: 'lastName', label: 'Last Name' },
              ].map(({ key, label }) => (
                <div key={key} className="relative group">
                  <label
                    htmlFor={key}
                    className="block mb-1 text-sm font-semibold text-gray-700 group-focus-within:text-blue-600 transition-colors duration-300"
                  >
                    {label}*
                  </label>
                  <input
                    id={key}
                    name={key}
                    type="text"
                    value={formData[key]}
                    onChange={handleChange}
                    required={key !== 'middleName'}
                    className={`peer w-full rounded-xl px-4 py-2 text-gray-900 font-medium shadow-sm
                      border border-gray-300
                      placeholder-transparent
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      transition duration-300
                      text-md
                      `}
                    placeholder={label}
                  />
                  <span className="absolute left-4 top-9 text-xs text-gray-400 peer-placeholder-shown:opacity-100 opacity-0 transition-opacity duration-300">
                    Enter {label}
                  </span>
                  {errors[key] && (
                    <p className="text-xs text-red-600 mt-1">{errors[key]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Other Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Roll Number', name: 'rollNo', type: 'text' },
                { label: 'PRN Number', name: 'prn', type: 'text' },
                { label: 'Date of Birth', name: 'dob', type: 'date' },
                { label: 'Mobile Number', name: 'mobileNo', type: 'tel' },
              ].map(({ label, name, type }) => (
                <div key={name} className="relative group">
                  <label
                    htmlFor={name}
                    className="block mb-1 text-sm font-semibold text-gray-700 group-focus-within:text-blue-600 transition-colors duration-300"
                  >
                    {label}*
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className={`peer w-full rounded-xl px-4 py-2 text-gray-900 font-medium shadow-sm
                      border border-gray-300
                      placeholder-transparent
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      transition duration-300
                      text-md
                      `}
                    placeholder={label}
                  />
                  <span className="absolute left-4 top-9 text-xs text-gray-400 peer-placeholder-shown:opacity-100 opacity-0 transition-opacity duration-300">
                    Enter {label}
                  </span>
                  {errors[name] && (
                    <p className="text-xs text-red-600 mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}

              {/* Department */}
              <div className="relative group">
                <label
                  htmlFor="department"
                  className="block mb-1 text-sm font-semibold text-gray-700 group-focus-within:text-blue-600 transition-colors duration-300"
                >
                  Department*
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl px-4 py-2 text-gray-900 font-medium shadow-sm border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    bg-white text-md transition duration-300"
                >
                  <option value="" disabled hidden>
                    Select Department
                  </option>
                  <option value="CE">CE</option>
                  <option value="IT">IT</option>
                  <option value="EnTC">EnTC</option>
                  <option value="AIDS">AIDS</option>
                  <option value="ECE">ECE</option>
                </select>
                {errors.department && (
                  <p className="text-xs text-red-600 mt-1">{errors.department}</p>
                )}
              </div>

              {/* Division */}
              <div className="relative group">
                <label
                  htmlFor="division"
                  className="block mb-1 text-sm font-semibold text-gray-700 group-focus-within:text-blue-600 transition-colors duration-300"
                >
                  Division*
                </label>
                <select
                  id="division"
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl px-4 py-2 text-gray-900 font-medium shadow-sm border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    bg-white text-md transition duration-300"
                >
                  <option value="" disabled hidden>
                    Select Division
                  </option>
                  {[...Array(13)].map((_, i) => (
                    <option key={i} value={`FY-${i + 1}`}>
                      {`FY-${i + 1}`}
                    </option>
                  ))}
                </select>
                {errors.division && (
                  <p className="text-xs text-red-600 mt-1">{errors.division}</p>
                )}
              </div>

              {/* Gender */}
              <fieldset className="col-span-full">
                <legend className="text-sm font-semibold text-gray-700 mb-3">Gender*</legend>
                <div className="flex space-x-8">
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <label
                      key={gender}
                      className="inline-flex items-center cursor-pointer select-none"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleChange}
                        required
                        className="h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-3 text-gray-900 font-semibold">{gender}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && (
                  <p className="text-xs text-red-600 mt-1">{errors.gender}</p>
                )}
              </fieldset>

              {/* Address */}
              <div className="md:col-span-2 relative group">
                <label
                  htmlFor="address"
                  className="block mb-1 text-sm font-semibold text-gray-700 group-focus-within:text-blue-600 transition-colors duration-300"
                >
                  Address*
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  required
                  placeholder="Enter your full address"
                  className="peer w-full rounded-xl px-4 py-3 text-gray-900 font-medium shadow-sm border border-gray-300
                    placeholder-transparent resize-none
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition duration-300 text-md"
                />
                <span className="absolute left-4 top-14 text-xs text-gray-400 peer-placeholder-shown:opacity-100 opacity-0 transition-opacity duration-300">
                  Enter your full address
                </span>
                {errors.address && (
                  <p className="text-xs text-red-600 mt-1">{errors.address}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={submitting}
                className={`w-full bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-cyan-700 hover:to-blue-800
                  text-white py-3 rounded-3xl text-lg font-extrabold shadow-lg transition-transform duration-300
                  transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {submitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
            {success && (
              <p className="text-green-600 font-semibold mt-4 text-center drop-shadow-md">
                Registration successful!
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Banner Section */}
      <div className="lg:w-1/3 flex flex-col items-center justify-center p-8 order-1 lg:order-2 bg-gradient-to-tr from-orange-400 via-yellow-400 to-orange-500 rounded-lg shadow-2xl text-white relative overflow-hidden lg:ml-6 mb-6 lg:mb-0">
        {/* EthiCraft Logo */}
        <img src="favicon.ico" alt="EthiCraft Logo" className="mb-8 w-40 drop-shadow-lg" />

        <div className="mb-10 space-y-4 text-center z-10 relative">
          <h2 className="text-4xl font-extrabold drop-shadow-lg">Welcome to Student Registration</h2>
          <p className="text-lg drop-shadow-lg">
            Please fill the form carefully and submit.
          </p>
        </div>

        <div className="flex flex-col gap-5 mb-10 z-10 relative">
          {[{ icon: FaRocket, text: 'Pay 500/- for successful registration' }].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center space-x-4 text-white drop-shadow-md">
              <Icon className="text-3xl" />
              <span className="text-lg font-semibold">{text}</span>
            </div>
          ))}
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-xl p-5 shadow-lg w-52 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-300">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://yourpaymentlink.com"
            alt="Scan to pay QR code"
            className="mb-3 w-40 h-40 object-contain"
          />
          <span className="text-orange-600 font-semibold text-center drop-shadow-md">Scan to pay</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
