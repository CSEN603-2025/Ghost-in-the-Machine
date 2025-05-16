import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from 'lucide-react';
import Toast from '../components/Toast';


export default function StudentReportEditor() {
  const [toastData, setToastData] = useState(null);

  const [report, setReport] = useState({
    title: "",
    introduction: "",
    body: "",
    selectedCourses: [],
    major: "",
  });
  const [availableCourses, setAvailableCourses] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const majorToCourses = {
    "Computer Engineering": ["Data Structures", "Algorithms", "Database Systems", "Operating Systems", "Computer Networks"],
    Business: ["Marketing", "Accounting", "Finance", "Organizational Behavior", "Business Analytics"],
    Pharmacy: ["Pharmacology", "Medicinal Chemistry", "Pharmaceutics", "Pharmacognosy", "Clinical Pharmacy"],
    Management: ["Operations Management", "Project Management", "HR Management", "Strategic Management", "Supply Chain"],
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentReport"));
    if (stored) {
      setReport({
        ...stored,
        selectedCourses: stored.selectedCourses || [],
        major: stored.major || "",
      });
    }
  }, []);

  useEffect(() => {
    if (report.major && majorToCourses[report.major]) {
      setAvailableCourses(majorToCourses[report.major]);
    }
  }, [report.major]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport((r) => ({ ...r, [name]: value }));
  };

  const handleCourseSelection = (e) => {
    const { value } = e.target;
    setReport((r) => {
      const selected = r.selectedCourses || [];
      const updated = selected.includes(value)
        ? selected.filter((c) => c !== value)
        : [...selected, value];
      return { ...r, selectedCourses: updated };
    });
  };

  const validateFields = () => {
    const errors = {};
    if (!report.title.trim()) errors.title = "Title is required.";
    if (!report.introduction.trim()) errors.introduction = "Introduction is required.";
    if (!report.body.trim()) errors.body = "Body is required.";
    if (!report.major) errors.major = "Major is required.";
    if (report.selectedCourses.length === 0) errors.selectedCourses = "At least one course must be selected.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    localStorage.setItem("studentReport", JSON.stringify(report));
 setToastData({ message: "Report saved successfully!", type: "success" });

  };

  const handleView = (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    localStorage.setItem("studentReport", JSON.stringify(report));
    navigate("/student/view-report");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
        <div className="max-w-4xl mx-auto px-6 py-20 relative z-10 text-center text-white">
          <h1 className="text-5xl font-extrabold mb-4"> Edit Internship Report</h1>
          <p className="text-xl opacity-90">
            Write or update your report, choose courses that helped you, then save or view.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20 pb-16">
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800">Report Details</h2>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              name="title"
              value={report.title}
              onChange={handleInputChange}
              placeholder="Report title"
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm"
            />
            {fieldErrors.title && <p className="text-red-600 text-sm mt-1">{fieldErrors.title}</p>}
          </div>

          {/* Introduction */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Introduction</label>
            <textarea
              name="introduction"
              value={report.introduction}
              onChange={handleInputChange}
              placeholder="Brief introduction..."
              rows={3}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm"
            />
            {fieldErrors.introduction && <p className="text-red-600 text-sm mt-1">{fieldErrors.introduction}</p>}
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
            <textarea
              name="body"
              value={report.body}
              onChange={handleInputChange}
              placeholder="Detail your experience..."
              rows={6}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm"
            />
            {fieldErrors.body && <p className="text-red-600 text-sm mt-1">{fieldErrors.body}</p>}
          </div>

          {/* Major */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Your Major</label>
            <select
              name="major"
              value={report.major}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-300 p-3 shadow-sm"
            >
              <option value="">-- Choose a major --</option>
              {Object.keys(majorToCourses).map((m, i) => (
                <option key={i} value={m}>{m}</option>
              ))}
            </select>
            {fieldErrors.major && <p className="text-red-600 text-sm mt-1">{fieldErrors.major}</p>}
          </div>

          {/* Courses */}
          {report.major && (
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">Select helpful courses:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableCourses.map((course, idx) => (
                  <label key={idx} className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={course}
                      checked={report.selectedCourses.includes(course)}
                      onChange={handleCourseSelection}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{course}</span>
                  </label>
                ))}
              </div>
              {fieldErrors.selectedCourses && <p className="text-red-600 text-sm mt-1">{fieldErrors.selectedCourses}</p>}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
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
        </motion.form>
      </div>
      {toastData && (
  <Toast
    message={toastData.message}
    type={toastData.type}
    containerProps={{ position: 'bottom-left' }} // ✅ override here
  />
)}


    </div>
  );
}