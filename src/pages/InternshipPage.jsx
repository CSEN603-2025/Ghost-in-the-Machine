// src/pages/InternshipPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const InternshipPage = () => {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [isProStudent, setIsProStudent] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentProfile"));
    const storedInternships = stored?.internships || [];

    const hardcoded = [
      {
        id: 101,
        company: "Meta",
        role: "AI Intern",
        duration: 2,
        status: "completed",
        startDate: "2024-01-01",
        endDate: "2024-03-01"
      },
      {
        id: 102,
        company: "Amazon",
        role: "Cloud Intern",
        duration: 1,
        status: "current",
        startDate: "2025-05-01",
        endDate: "2025-06-01"
      }
    ];

    const combined = [...storedInternships, ...hardcoded];
    setInternships(combined);
    setFilteredInternships(combined);

    const totalMonths = combined
      .filter(i => i.status === "completed")
      .reduce((acc, i) => acc + i.duration, 0);

    setIsProStudent(totalMonths >= 3);
  }, []);

  const filterInternships = (term, status, start, end) => {
    let f = internships.filter(i =>
      i.company.toLowerCase().includes(term.toLowerCase()) ||
      i.role.toLowerCase().includes(term.toLowerCase())
    );
    if (status === "current") {
      f = f.filter(i => new Date(i.endDate) >= new Date());
    } else if (status === "completed") {
      f = f.filter(i => new Date(i.endDate) < new Date());
    }
    if (start) {
      f = f.filter(i => new Date(i.startDate) >= new Date(start));
    }
    if (end) {
      f = f.filter(i => new Date(i.endDate) <= new Date(end));
    }
    setFilteredInternships(f);
  };

  const handleSearch = e => {
    const t = e.target.value;
    setSearch(t);
    filterInternships(t, statusFilter, startDateFilter, endDateFilter);
  };
  const handleStatusChange = e => {
    const v = e.target.value;
    setStatusFilter(v);
    filterInternships(search, v, startDateFilter, endDateFilter);
  };
  const handleStartDateChange = e => {
    const v = e.target.value;
    setStartDateFilter(v);
    filterInternships(search, statusFilter, v, endDateFilter);
  };
  const handleEndDateChange = e => {
    const v = e.target.value;
    setEndDateFilter(v);
    filterInternships(search, statusFilter, startDateFilter, v);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95" />
        <div className="max-w-4xl mx-auto px-6 py-20 relative z-10 text-center text-white">
          <h1 className="text-5xl font-extrabold mb-4">📚 My Internships</h1>
          <p className="text-xl opacity-90">
            Track your history, filter by status or date, and earn your “PRO Student” badge at 3 months!
          </p>
          {isProStudent && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
              className="inline-block mt-6 bg-yellow-300 text-gray-900 px-5 py-2 rounded-full font-semibold shadow-lg"
            >
              ⭐ PRO Student
            </motion.span>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Filters Panel */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-1 sm:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search by company or role"
                  value={search}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <select
                value={statusFilter}
                onChange={handleStatusChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="current">Current</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Start Date</label>
              <input
                type="date"
                value={startDateFilter}
                onChange={handleStartDateChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">End Date</label>
              <input
                type="date"
                value={endDateFilter}
                onChange={handleEndDateChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Internship Cards */}
      <div className="max-w-4xl mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
        {filteredInternships.length === 0 ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center text-gray-500 py-12">
            No internships found.
          </motion.p>
        ) : (
          filteredInternships.map((i) => (
            <motion.div
              key={i.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
              className={`bg-white rounded-xl p-6 border border-gray-100 transition-colors`}
            >
              <Link to={`/student/internship/${i.id}`}>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">🏢 {i.company}</h3>
                <p className="text-gray-600 mb-1">👨‍💻 <strong>Role:</strong> {i.role}</p>
                <p className="text-gray-600 mb-1">⏱️ <strong>Duration:</strong> {i.duration} mo.</p>
                <p className={`text-gray-600 mb-1 font-semibold ${i.status === "completed" ? "text-green-700" : ""}`}>
                  📌 <strong>Status:</strong> {i.status}
                </p>
                <p className="text-gray-600">📆 {i.startDate} → {i.endDate}</p>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default InternshipPage;
