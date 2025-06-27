import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchEID, setSearchEID] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:8080/students')
      .then(res => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch students');
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchEID(e.target.value);
  };

  const handleGenderFilterChange = (e) => {
    setGenderFilter(e.target.value);
  };

  // Apply filters
  const filteredStudents = students.filter(s => {
    const eid = `EC25${s.rollNo}F`.toLowerCase();
    const matchesEID = eid.includes(searchEID.toLowerCase());
    const matchesGender = genderFilter === 'All' || s.gender.toLowerCase() === genderFilter.toLowerCase();
    return matchesEID && matchesGender;
  });

  const maleCount = filteredStudents.filter(s => s.gender.toLowerCase() === 'male').length;
  const femaleCount = filteredStudents.filter(s => s.gender.toLowerCase() === 'female').length;
  const totalCount = filteredStudents.length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Admin Dashboard</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search by EID No (e.g., EC25123F)"
            value={searchEID}
            onChange={handleSearchChange}
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md shadow-sm"
          />
          <select
            value={genderFilter}
            onChange={handleGenderFilterChange}
            className="w-full md:w-1/4 p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="All">Male and Female</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {loading ? (
          <p>Loading students...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-2 md:space-y-0">
              <div className="text-sm text-gray-700">
                <span className="font-semibold">Total Students:</span> {totalCount}
              </div>
              <div className="flex space-x-4 text-sm text-gray-700">
                <div><span className="font-semibold text-blue-600">Male:</span> {maleCount}</div>
                <div><span className="font-semibold text-pink-600">Female:</span> {femaleCount}</div>
              </div>
            </div>
            <table className="w-full table-auto border border-collapse text-sm">
              <thead>
                <tr className="bg-blue-200">
                  <th className="p-2 border">EID No</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Division</th>
                  <th className="p-2 border">Department</th>
                  <th className="p-2 border">Gender</th>
                  <th className="p-2 border">Mobile No.</th>
                  <th className="p-2 border">PRN Number</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.rollNo} className="hover:bg-gray-100">
                    <td className="p-2 border text-center">{`EC25${s.rollNo}F`}</td>
                    <td className="p-2 border">{s.firstName} {s.middleName} {s.lastName}</td>
                    <td className="p-2 border text-center">{s.division}</td>
                    <td className="p-2 border text-center">{s.department}</td>
                    <td className="p-2 border text-center">{s.gender}</td>
                    <td className="p-2 border text-center">{s.mobileNo}</td>
                    <td className="p-2 border text-center">{s.prn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
