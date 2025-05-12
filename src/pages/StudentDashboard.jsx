// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const allSuggestedCompanies = [
  { name: "Instabug", industry: "Technology", recommendations: 5 },
  { name: "Valeo", industry: "Technology", recommendations: 4 },
  { name: "IBM", industry: "Technology", recommendations: 5 },
  { name: "BizPros", industry: "Business", recommendations: 3 },
];

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  hover: { scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }
};

export default function StudentDashboard() {
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [companyFilter, setCompanyFilter] = useState({ industry: "", company: "" });
  const [searchText, setSearchText] = useState("");
  const [isPro, setIsPro] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studentProfile")) || {};
    setSelectedMajor(saved.major || "");
    setSelectedSemester(saved.semester || "");
    const internships = JSON.parse(localStorage.getItem("studentInternships")) || [];
    const total = internships
      .filter(i => i.status === "completed")
      .reduce((sum, i) => sum + parseInt(i.duration?.match(/\d+/)?.[0] || "0", 10), 0);
    setIsPro(total >= 3);
  }, []);

  useEffect(() => {
    const score = localStorage.getItem("onlineAssessmentScore");
    if (score) setAssessmentScore(Number(score));
  }, []);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setCompanyFilter(f => ({ ...f, [name]: value }));
  };

  // filter & sort
  const filtered = allSuggestedCompanies.filter(c =>
    (!companyFilter.industry || c.industry === companyFilter.industry) &&
    (!companyFilter.company || c.name === companyFilter.company) &&
    c.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const sorted = filtered.sort((a, b) => b.recommendations - a.recommendations);

  const dashboardLinks = [
    { label: "Internships", path: "/student/internships" },
    { label: "My Applications", path: "/student/my-applications" },
    { label: "Submit Report", path: "/student/report" },
    { label: "Edit Profile", path: "/student/edit-profile" },
    { label: "Evaluation", path: "/student/evaluation" },
    { label: "SCAD Internships", path: "/student/scad-internships" },
    { label: "View Reports", path: "/student/reports" },
    { label: "Online Assessments", path: "/student/assessment" },
    { label: "Viewed Profile", path: "/student/viewed-profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Gradient Hero */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#00D6A0] to-[#00106A] text-white py-16"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome, Student! {isPro && <span className="text-yellow-300">⭐ PRO</span>}
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Your major: <strong>{selectedMajor}</strong> &ensp;|&ensp; Semester: <strong>{selectedSemester}</strong>
          </p>
          {assessmentScore !== null && (
            <p className="bg-blue-100 text-blue-800 inline-block px-4 py-2 rounded-full font-medium">
              🧠 Assessment Score: {assessmentScore} / 100
            </p>
          )}
          {/* Home & Logout */}
          <div className="mt-8 flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = "/"}
              className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-full shadow hover:shadow-lg transition-all"
            >
              Home
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { localStorage.clear(); window.location.href = "/"; }}
              className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full shadow hover:shadow-lg transition-all"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 mt-10">
        {/* Dashboard Links */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardContainerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {dashboardLinks.map(link => (
            <motion.div
              key={link.label}
              variants={cardVariants}
              whileHover="hover"
            >
              <Link to={link.path}>
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow hover:shadow-lg transition-all">
                  <h4 className="text-lg font-medium text-[#00106A]">{link.label}</h4>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Suggested Companies */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Suggested Companies
        </h2>
        <input
          type="text"
          placeholder="🔍 Search by company name"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D6A0]/50 focus:outline-none"
        />
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            name="industry"
            value={companyFilter.industry}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D6A0]/50 focus:outline-none"
          >
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
          </select>
          <select
            name="company"
            value={companyFilter.company}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D6A0]/50 focus:outline-none"
          >
            <option value="">All Companies</option>
            {allSuggestedCompanies
              .filter(c => !companyFilter.industry || c.industry === companyFilter.industry)
              .map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
          </select>
        </div>

        {/* Company Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardContainerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sorted.length > 0 ? (
            sorted.map((c, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-xl border border-gray-200 p-6 shadow hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-semibold mb-2">{c.name} 🏢</h3>
                <p className="text-gray-600 mb-1"><strong>Industry:</strong> {c.industry}</p>
                <p className="text-gray-600 mb-4"><strong>Recs:</strong> {c.recommendations}/5 ⭐</p>
                <Link to={`/student/company/${c.name}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-[#00D6A0] to-[#00106A] text-white px-4 py-2 rounded-full shadow hover:shadow-xl transition-all"
                  >
                    View Profile
                  </motion.button>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-12">
              No companies match your filters.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
