// src/pages/ViewedCompaniesPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function ViewedCompaniesPage() {
  const [viewedCompanies, setViewedCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating companies that viewed the student's profile
    setViewedCompanies([
      "Tech Corp",
      "Innovate Solutions",
      "Global Enterprises",
      "Creative Labs"
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#00D6A0] to-[#00106A] text-white py-16 mb-8"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            👀 Companies Viewed My Profile
          </h1>
          <p className="text-lg opacity-90">
            See who’s been interested in your experience and reach out!
          </p>
        </div>
      </motion.div>

      {/* Top Nav Buttons */}
      <div className="max-w-4xl mx-auto px-6 mb-8 flex justify-end space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/student')}
          className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold py-2 px-6 rounded-full shadow hover:shadow-lg transition-all"
        >
          Home
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { localStorage.clear(); navigate('/'); }}
          className="bg-gradient-to-r from-red-500 to-red-400 text-white py-2 px-6 rounded-full shadow hover:shadow-lg transition-all"
        >
          Logout
        </motion.button>
      </div>

      {/* Company Cards */}
      <div className="max-w-4xl mx-auto px-6">
        {viewedCompanies.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-12"
          >
            No companies have viewed your profile yet.
          </motion.p>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {viewedCompanies.map((company, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-xl shadow-md border border-gray-100 cursor-default p-6 transition-all duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {company}
                </h2>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
