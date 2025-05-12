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
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#00D6A0] to-[#00106A] text-white py-16 mb-8"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">✏️ Edit Internship Report</h1>
          <p className="text-lg opacity-90">
            Write or update your report, choose courses that helped you, then save or view the finalized version.
          </p>
        </div>
      </motion.div>

      {/* Form Card */}
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-md p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800">Report Details</h2>
          <form className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                name="title"
                value={report.title}
                onChange={handleInputChange}
                placeholder="Report title"
                className="mt-1 block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
              />
            </div>

            {/* Introduction */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Introduction
              </label>
              <textarea
                name="introduction"
                value={report.introduction}
                onChange={handleInputChange}
                placeholder="Write a brief introduction..."
                rows={3}
                className="mt-1 block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
              />
            </div>

            {/* Body */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Body
              </label>
              <textarea
                name="body"
                value={report.body}
                onChange={handleInputChange}
                placeholder="Detail your experience..."
                rows={6}
                className="mt-1 block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#00D6A0]/50 focus:border-transparent"
              />
            </div>

            {/* Courses */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Courses that helped you:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courses.map((c, i) => (
                  <label
                    key={i}
                    className="inline-flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      value={c}
                      checked={report.selectedCourses.includes(c)}
                      onChange={handleCourseSelection}
                      className="h-4 w-4 rounded border-gray-300 text-[#00D6A0] focus:ring-[#00D6A0]"
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
                className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Save Report
              </button>
              <button
                type="button"
                onClick={handleView}
                className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
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
