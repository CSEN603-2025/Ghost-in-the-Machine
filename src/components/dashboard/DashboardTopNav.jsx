import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DashboardTopNav = ({ portalTitle, logoText, homePath = '/', logoutPath = '/welcome' }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full bg-white bg-opacity-80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div
          onClick={() => navigate(homePath)}
          className="flex items-center cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#00106A] to-[#00D6A0] flex items-center justify-center text-white font-bold mr-2">
            {logoText}
          </div>
          <span className="text-xl font-bold text-gray-800">{portalTitle}</span>
        </div>

        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(homePath)}
            className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all"
          >
            Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(logoutPath)}
            className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all"
          >
            Logout
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardTopNav;
