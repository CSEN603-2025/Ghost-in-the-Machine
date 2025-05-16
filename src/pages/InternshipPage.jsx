import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from 'lucide-react';
import {
  FaIndustry,
  FaLaptopCode,
  FaHourglassHalf,
  FaCalendarCheck,
  FaCalendarAlt,
  FaSearch,
  FaTrash
} from "react-icons/fa";

const InternshipPage = () => {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const navigate = useNavigate();
  const [isProStudent, setIsProStudent] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    loadInternships();
  }, []);

  const loadInternships = () => {
    const stored = JSON.parse(localStorage.getItem("studentProfile")) || {};
    const storedInternships = stored.internships || [];
    setInternships(storedInternships);
    setFilteredInternships(storedInternships);

    const totalMonths = storedInternships
      .filter(i => i.status === "completed")
      .reduce((acc, i) => acc + (parseInt(i.duration) || 0), 0);
    setIsProStudent(totalMonths >= 3);
  };

  const clearInternships = () => {
    setShowConfirmModal(true);
  };

  const confirmClearInternships = () => {
    const stored = JSON.parse(localStorage.getItem("studentProfile")) || {};
    localStorage.setItem("studentProfile", JSON.stringify({
      ...stored,
      internships: []
    }));
    loadInternships();
    setShowConfirmModal(false);
  };

  const cancelClearInternships = () => {
    setShowConfirmModal(false);
  };

  const filterInternships = (term, status, start, end) => {
    let f = internships;

    if (term) {
      f = f.filter(i =>
        (i.company && i.company.toLowerCase().includes(term.toLowerCase())) ||
        (i.role && i.role.toLowerCase().includes(term.toLowerCase()))
      );
    }

    if (status !== "all") {
      f = f.filter(i => i.status === status);
    }

    if (start) {
      const startDate = new Date(start);
      f = f.filter(i => {
        if (!i.startDate) return false;
        return new Date(i.startDate) >= startDate;
      });
    }
    if (end) {
      const endDate = new Date(end);
      f = f.filter(i => {
        if (!i.endDate) return false;
        return new Date(i.endDate) <= endDate;
      });
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
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
        <div className="max-w-4xl mx-auto px-6 py-20 relative z-10 text-center text-white">
          <h1 className="text-5xl font-extrabold mb-4">My Internships</h1>
          <p className="text-xl opacity-90">
            Track your history, filter by status or date, and earn your "PRO Student" badge at 3 months!
          </p>
          <div className="flex justify-center gap-4 mt-6">
            {isProStudent && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                className="inline-block bg-yellow-300 text-gray-900 px-5 py-2 rounded-full font-semibold shadow-lg"
              >
                <FaHourglassHalf className="inline mr-2" /> PRO Student
              </motion.span>
            )}
            <button 
              onClick={clearInternships}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-colors"
            >
              <FaTrash /> Clear All Internships
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-1 sm:col-span-2 relative">
              <input
                type="text"
                placeholder="Search by company or role"
                value={search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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

      <div className="max-w-4xl mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
        {filteredInternships.length === 0 ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center text-gray-500 py-12">
            No internships found.
          </motion.p>
        ) : (
          filteredInternships.map(i => (
            <motion.div
              key={i.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
              className={`bg-white rounded-xl p-6 border flex flex-col justify-between ${
                i.status === "completed" ? "border-green-400" : "border-gray-100"
              }`}
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  <FaIndustry className="inline mr-2 text-gray-600" />
                  {i.company}
                </h3>
                <p className="text-gray-600 mb-1">
                  <FaLaptopCode className="inline mr-2 text-gray-600" />
                  <strong>Role:</strong> {i.role}
                </p>
                <p className="text-gray-600 mb-1">
                  <FaHourglassHalf className="inline mr-2 text-gray-600" />
                  <strong>Duration:</strong> {i.duration} mo.
                </p>
                <p className={`text-gray-600 mb-1 font-semibold ${i.status === "completed" ? "text-green-700" : ""}`}>
                  <FaCalendarCheck className="inline mr-2 text-gray-600" />
                  <strong>Status:</strong> {i.status}
                </p>
                <p className="text-gray-600">
                  <FaCalendarAlt className="inline mr-2 text-gray-600" />
                  {i.startDate} → {i.endDate}
                </p>
              </div>

              {i.status === "completed" && (
                <Link
                  to={`/student/company/${encodeURIComponent(i.company)}`}
                  className="mt-4 inline-block text-blue-600 hover:underline font-medium"
                >
                  Details →
                </Link>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to clear all internships?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmClearInternships}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={cancelClearInternships}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipPage;