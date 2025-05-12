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
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#00D6A0] to-[#00106A] text-white py-16 mb-8"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">📚 My Internships</h1>
          <p className="text-lg opacity-90">
            Track your internship history, filter by status or date, and
            celebrate your “PRO Student” badge when you hit 3 months!
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
      </motion.div>

      {/* Filters & Search */}
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
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
              className="col-span-full text-center text-gray-500 py-12"
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
                className={`bg-white rounded-xl p-6 border transition-colors ${
                  i.status === "completed" ? "border-green-200" : "border-gray-200"
                }`}
              >
                <Link to={`/student/internship/${i.id}`}>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    🏢 {i.company}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    👨‍💻 <strong>Role:</strong> {i.role}
                  </p>
                  <p className="text-gray-600 mb-1">
                    ⏱️ <strong>Duration:</strong> {i.duration} mo.
                  </p>
                  <p className="text-gray-600 mb-1">
                    📌 <strong>Status:</strong> {i.status}
                  </p>
                  <p className="text-gray-600">
                    📆 {i.startDate} → {i.endDate}
                  </p>
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
