// src/pages/ViewedCompaniesPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaSearch } from 'react-icons/fa';
 import { ArrowLeft } from 'lucide-react';

export default function ViewedCompaniesPage() {
  const [viewedCompanies, setViewedCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
 


  useEffect(() => {
    // Simulated data for demo purposes
    setViewedCompanies([
      "Tech Corp",
      "Innovate Solutions",
      "Global Enterprises",
      "Creative Labs"
    ]);
  }, []);

  const filtered = viewedCompanies.filter(c =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
           <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-30 flex items-center text-white hover:underline"
        >
          <ArrowLeft className="mr-1 w-5 h-5" /> Back
        </motion.button>
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95" />
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center text-white">
          <FaClipboardList size={48} className="mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-2"> Companies Viewed My Profile</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-blue-100">
            See who’s been interested in your experience and reach out!
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-20 max-w-7xl mx-auto px-6 py-6 -mt-12 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center gap-4"
      >

        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D6A0]"
          />
        </div>
      </motion.div>

      {/* Company Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.length === 0 ? (
          <motion.p
            variants={variants}
            className="col-span-full text-center text-gray-500 py-12"
          >
            No companies match your search.
          </motion.p>
        ) : (
          filtered.map((company, idx) => (
            <motion.div
              key={idx}
              variants={variants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col justify-center items-center text-center transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">{company}</h2>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
