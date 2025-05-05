import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClickableCard from '../components/ClickableCard';

const SCADDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  const dashboardCards = [
    {
      header: 'Manage Companies',
      details: 'View, search, filter, accept/reject company applications.',
      nextPage: '/manage-companies'
    },
    {
      header: 'View All Internships',
      details: 'Search/filter/select internships from all companies.',
      nextPage: '/view-all-internships'
    },
    {
      header: 'View All Students',
      details: 'Filter by internship status, view profiles.',
      nextPage: '/students'
    },
    {
      header: 'Manage Internship Cycle',
      details: 'Set start and end dates for internship cycles.',
      nextPage: '/manage-internship-cycle'
    },
    {
      header: 'Download Documents',
      details: 'Access and download reports, evaluations, etc.',
      nextPage: '/download-documents'
    },
    {
      header: 'Cycle Dates',
      details: 'Set, view and change the cycle dates of the next internship cycle',
      nextPage: '/cycle-dates'
    },
  ];

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      {/* Top Navbar */}
      <div className="w-full bg-[#00106A] py-6 px-6 flex items-center justify-between">
        <div className="w-1/3" />
        <div className="w-1/3 text-center">
          <h1 className="text-3xl font-bold text-white">SCAD Dashboard</h1>
        </div>
        <div className="w-1/3 flex justify-end space-x-4">
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] hover:from-[#00D6A0] hover:to-[#00F0B5] text-black font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/welcome')}
            className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 px-6 pb-12 pt-10">
        {dashboardCards.map((card) => (
          <ClickableCard
            key={card.nextPage}
            header={card.header}
            details={card.details}
            nextPage={card.nextPage}
            onClick={() => handleCardClick(card.nextPage)}
          />
        ))}
      </div>
    </div>
  );
};

export default SCADDashboard;
