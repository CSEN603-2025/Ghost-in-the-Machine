import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FinalizedReport = () => {
  const [report, setReport] = useState({
    title: "",
    introduction: "",
    body: "",
    selectedCourses: [],
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedReport = JSON.parse(localStorage.getItem("studentReport"));
    if (storedReport) {
      setReport(storedReport);
    }
  }, []);

  const selectedCourses = Array.isArray(report.selectedCourses)
    ? report.selectedCourses
    : [];

  const handleSubmit = () => {
    setSuccessMessage("✅ Report submitted successfully!");
    setTimeout(() => {
      navigate("/student-dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#00D6A0] to-[#00106A] text-white py-16 mb-8"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">📄 Finalized Report</h1>
          <p className="text-lg opacity-90">Review your report before final submission.</p>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow-md rounded-xl p-6 space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center">{report.title}</h2>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-1">📘 Introduction</h3>
            <p className="text-gray-600">{report.introduction}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-1">📝 Body</h3>
            <p className="text-gray-600">{report.body}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-1">🎓 Courses that helped you:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {selectedCourses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>

          {successMessage && (
            <div className="text-green-600 font-semibold text-center">{successMessage}</div>
          )}

          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-[#00D6A0] to-[#2b7de9] text-white px-6 py-2 rounded-full shadow hover:shadow-lg transition-all"
            >
              Submit Report
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FinalizedReport;
