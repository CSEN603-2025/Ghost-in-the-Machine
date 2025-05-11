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
    if (stored?.internships) {
      const valid = stored.internships;
      setInternships(valid);
      setFilteredInternships(valid);

      const totalMonths = valid
        .filter(i => i.status === "completed")
        .reduce((acc, i) => acc + i.duration, 0);

      setIsProStudent(totalMonths >= 3);
    }
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
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Animated Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow sticky top-0 z-30"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">GUC Internship System</h2>
          {isProStudent && (
            <span className="bg-yellow-300 text-white px-4 py-1 rounded-full font-semibold">
              ⭐ PRO Student
            </span>
          )}
        </div>
      </motion.nav>

      <div className="max-w-4xl mx-auto px-6">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-4xl font-extrabold text-gray-800"
        >
          💼 My Internships
        </motion.h1>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <input
            type="text"
            placeholder="🔍 Search by company or role"
            value={search}
            onChange={handleSearch}
            className="col-span-1 sm:col-span-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
          />
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="current">Current</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="date"
            value={startDateFilter}
            onChange={handleStartDateChange}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
          />
          <input
            type="date"
            value={endDateFilter}
            onChange={handleEndDateChange}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
          />
        </motion.div>

        {/* Internship Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredInternships.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center text-gray-500"
            >
              No internships found.
            </motion.p>
          ) : (
            filteredInternships.map((i, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                  hover: { scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }
                }}
                whileHover="hover"
                className={`bg-white rounded-xl p-6 transition-colors border ${
                  i.status === "completed" ? "border-green-200" : "border-gray-200"
                }`}
              >
                <Link to={`/student/internship/${i.id}`}>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    🏢 {i.company}
                  </h3>
                  <p className="text-gray-600 mb-1">👨‍💻 <strong>Role:</strong> {i.role}</p>
                  <p className="text-gray-600 mb-1">⏱️ <strong>Duration:</strong> {i.duration} mo.</p>
                  <p className="text-gray-600 mb-1">📌 <strong>Status:</strong> {i.status}</p>
                  <p className="text-gray-600">📆 {i.startDate} → {i.endDate}</p>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default InternshipPage;
