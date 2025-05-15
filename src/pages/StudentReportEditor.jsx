// src/pages/StudentReportEditor.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function StudentReportEditor() {
  const [report, setReport] = useState({
    title: "",
    introduction: "",
    body: "",
    selectedCourses: [],
  });
  const [courses] = useState([
    "Data Base 1",
    "Gaming",
    "Math 501",
    "Theory",
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentReport"));
    if (stored) {
      setReport({
        ...stored,
        selectedCourses: stored.selectedCourses || [],
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport((r) => ({ ...r, [name]: value }));
  };

  const handleCourseSelection = (e) => {
    const { value } = e.target;
    setReport((r) => {
      const sel = r.selectedCourses || [];
      const updated = sel.includes(value)
        ? sel.filter((c) => c !== value)
        : [...sel, value];
      return { ...r, selectedCourses: updated };
    });
  };

  const handleSave = () => {
    localStorage.setItem("studentReport", JSON.stringify(report));
    alert("Report saved!");
  };
  const handleView = () => {
    localStorage.setItem("studentReport", JSON.stringify(report));
    navigate("/student/view-report");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95" />
        <div className="max-w-4xl mx-auto px-6 py-20 relative z-10 text-center text-white">
          <h1 className="text-5xl font-extrabold mb-4">✏️ Edit Internship Report</h1>
          <p className="text-xl opacity-90">
            Write or update your report, choose courses that helped you, then save or view.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Form Card */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800">Report Details</h2>
          <form className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                name="title"
                value={report.title}
                onChange={handleInputChange}
                placeholder="Report title"
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Introduction */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Introduction
              </label>
              <textarea
                name="introduction"
                value={report.introduction}
                onChange={handleInputChange}
                placeholder="Brief introduction..."
                rows={3}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Body */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Body
              </label>
              <textarea
                name="body"
                value={report.body}
                onChange={handleInputChange}
                placeholder="Detail your experience..."
                rows={6}
                className="w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Courses */}
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">
                Courses that helped you:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courses.map((c, i) => (
                  <label key={i} className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={c}
                      checked={report.selectedCourses.includes(c)}
                      onChange={handleCourseSelection}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{c}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2 bg-gradient-to-r from-[#00106A] to-[#0038A0] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Save Report
              </button>
              <button
                type="button"
                onClick={handleView}
                className="px-6 py-2 bg-gradient-to-r from-[#00106A] to-[#0038A0] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                View Final Report
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
