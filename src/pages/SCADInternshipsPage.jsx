// src/pages/ScadInternshipsPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Dummy internships
const internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Valeo",
    duration: "3 Months",
    paid: true,
    industry: "Technology",
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "IBM",
    duration: "2 Months",
    paid: false,
    industry: "Technology",
  },
  {
    id: 3,
    title: "Marketing Intern",
    company: "P&G",
    duration: "1 Month",
    paid: true,
    industry: "Marketing",
  },
  {
    id: 4,
    title: "Accounting Assistant",
    company: "KPMG",
    duration: "2 Months",
    paid: false,
    industry: "Finance",
  },
];

export default function ScadInternshipsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [paidFilter, setPaidFilter] = useState("");
  const navigate = useNavigate();

  const handleCardClick = (id) => navigate(`/student/internship/${id}`);

  const filteredInternships = internships.filter((i) => {
    const matchesSearch =
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter ? i.industry === industryFilter : true;
    const matchesDuration = durationFilter ? i.duration === durationFilter : true;
    const matchesPaid =
      paidFilter === ""
        ? true
        : paidFilter === "paid"
        ? i.paid
        : !i.paid;
    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#00D6A0] to-[#00106A] text-white py-16 mb-8"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">🎓 SCAD Internships</h1>
          <p className="text-lg opacity-90">
            Browse and filter all available internships across industries and durations.
          </p>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 space-y-6">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <input
            type="text"
            placeholder="🔍 Search by title or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="col-span-1 sm:col-span-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
          />
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
          >
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>
          <select
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
          >
            <option value="">All Durations</option>
            <option value="1 Month">1 Month</option>
            <option value="2 Months">2 Months</option>
            <option value="3 Months">3 Months</option>
          </select>
          <select
            value={paidFilter}
            onChange={(e) => setPaidFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </motion.div>

        {/* "Guidelines" Button */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/student/internship-guidelines")}
            className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-xl transition-all"
          >
            📹 View Internship Guidelines
          </motion.button>
        </div>

        {/* Internship Cards Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredInternships.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center text-gray-500 py-12"
            >
              No internships found.
            </motion.p>
          ) : (
            filteredInternships.map((i) => (
              <motion.div
                key={i.id}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                  hover: { scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" },
                }}
                whileHover="hover"
                onClick={() => handleCardClick(i.id)}
                className="bg-white rounded-xl p-6 border border-gray-200 cursor-pointer transition-colors"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">📌 {i.title}</h3>
                <p className="text-gray-600 mb-1">
                  <strong>🏢 Company:</strong> {i.company}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>⏳ Duration:</strong> {i.duration}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>💰 Paid:</strong> {i.paid ? "Yes" : "No"}
                </p>
                <p className="text-gray-600">
                  <strong>🏷️ Industry:</strong> {i.industry}
                </p>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
