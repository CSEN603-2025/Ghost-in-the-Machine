import React from 'react';
import { useNavigate } from 'react-router-dom';

const SCADDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    navigate('/welcoome');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      {/* Top Navbar */}
      <div className="w-full bg-[#00106A] py-6 px-6 flex items-center justify-between">
        {/* Empty div for spacing or future icons */}
        <div className="w-1/3" />

        {/* Centered Title */}
        <div className="w-1/3 text-center">
          <h1 className="text-3xl font-bold text-white">SCAD Dashboard</h1>
        </div>

        {/* Home & Logout Buttons */}
        <div className="w-1/3 flex justify-end space-x-4">
          <button
            onClick={handleHome}
            className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] hover:from-[#00D6A0] hover:to-[#00F0B5] text-black font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-6 pb-12 pt-10">
        <div
          onClick={() => handleCardClick('/manage-companies')}
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-[#00106A] mb-4">Manage Companies</h3>
          <p className="text-gray-600">View, search, filter, accept/reject company applications.</p>
        </div>

        <div
          onClick={() => handleCardClick('/view-all-internships')}
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-[#00106A] mb-4">View All Internships</h3>
          <p className="text-gray-600">Search/filter/select internships from all companies.</p>
        </div>

        <div
          onClick={() => handleCardClick('/students')}
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-[#00106A] mb-4">View All Students</h3>
          <p className="text-gray-600">Filter by internship status, view profiles.</p>
        </div>

        <div
          onClick={() => handleCardClick('/manage-internship-cycle')}
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-[#00106A] mb-4">Manage Internship Cycle</h3>
          <p className="text-gray-600">Set start and end dates for internship cycles.</p>
        </div>

        <div
          onClick={() => handleCardClick('/download-documents')}
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-[#00106A] mb-4">Download Documents</h3>
          <p className="text-gray-600">Access and download reports, evaluations, etc.</p>
        </div>
      </div>
    </div>
  );
};
export default SCADDashboard;   