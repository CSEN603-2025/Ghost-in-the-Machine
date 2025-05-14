import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardTopNav from '../components/dashboard/DashboardTopNav';
import { motion } from 'framer-motion';

const FacultyDashboardPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => navigate(route);

  const cards = [
    {
      title: "Internship Reports",
      desc: "View and filter submitted internship reports.",
      route: "/faculty/internship-reports",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Evaluation Reports",
      desc: "Review student/company evaluations and feedback.",
      route: "/faculty/evaluation-reports",
      color: "from-blue-600 to-blue-700"
    },

    {
      title: "Statistics",
      desc: "View real-time system metrics and reports.",
      route: "/faculty/statistics",
      color: "from-blue-800 to-blue-900"
    },

  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Premium Navbar */}
      <DashboardTopNav portalTitle="Faculty Portal" logoText="FA" />

      {/* Dashboard Cards */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 82, 190, 0.1)"
              }}
              onClick={() => handleCardClick(card.route)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 h-full flex flex-col border border-gray-100 hover:ring-2 hover:ring-opacity-30 hover:ring-[#00D6A0]"
            >
              <div className={`h-2 w-full bg-gradient-to-r ${card.color}`}></div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{card.title}</h3>
                <p className="text-gray-600 mb-4">{card.desc}</p>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="text-[#00D6A0] font-medium flex items-center mt-auto"
                >
                  Open
                  <svg 
                    className="w-4 h-4 ml-1"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FacultyDashboardPage;