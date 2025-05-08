import React from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyDashboardPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  const handleHome = () => navigate('/');
  const handleLogout = () => navigate('/welcome');

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      {/* Top Navbar */}
      <div className="w-full bg-[#00106A] py-6 px-6 flex items-center justify-between">
        <div className="w-1/3" />
        <div className="w-1/3 text-center">
          <h1 className="text-3xl font-bold text-white">Faculty Dashboard</h1>
        </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-12 pt-10">
        <div
          onClick={() => handleCardClick('/faculty/internship-reports')}
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-[#00106A] mb-4">Internship Reports</h3>
          <p className="text-gray-600">View and filter submitted internship reports.</p>
        </div>

        <div
          onClick={() => handleCardClick('/faculty/evaluation-reports')}
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-[#00106A] mb-4">Evaluation Reports</h3>
          <p className="text-gray-600">Review student/company evaluations and feedback.</p>
        </div>

        <div
          onClick={() => handleCardClick('/faculty/appointments')}
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-[#00106A] mb-4">Appointments</h3>
          <p className="text-gray-600">Manage video-call requests and career guidance.</p>
        </div>

        <div
          onClick={() => handleCardClick('/faculty/statistics')}
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-[#00106A] mb-4">Statistics</h3>
          <p className="text-gray-600">View real-time system metrics and reports.</p>
        </div>

        <div
          onClick={() => handleCardClick('/faculty/download-docs')}
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-[#00106A] mb-4">Download Documents</h3>
          <p className="text-gray-600">Access and download evaluations, reports, and files.</p>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboardPage;
