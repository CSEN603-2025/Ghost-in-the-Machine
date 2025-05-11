// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
  const [selectedInterests, setSelectedInterests] = useState("Technology");
  const [companyFilter, setCompanyFilter] = useState({ industry: "", company: "" });
  const [searchText, setSearchText] = useState("");
  const [isPro, setIsPro] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState(null);

  useEffect(() => {
    const savedScore = localStorage.getItem("onlineAssessmentScore");
    if (savedScore) setAssessmentScore(Number(savedScore));
  }, []);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("studentProfile")) || {};
    setSelectedMajor(profile.major || "");
    setSelectedSemester(profile.semester || "");
  }, []);

  useEffect(() => {
    const lastSeen = localStorage.getItem("lastSeenReportStatus");
    const current = localStorage.getItem("reportStatus");
    if (current && lastSeen && current !== lastSeen) {
      alert(`🔔 Your internship report status is now: ${current.toUpperCase()}`);
    }
    if (current) localStorage.setItem("lastSeenReportStatus", current);
  }, []);

  useEffect(() => {
    const internships = JSON.parse(localStorage.getItem("studentInternships")) || [];
    const totalMonths = internships
      .filter(i => i.status === "completed")
      .reduce((sum, i) => sum + (parseInt(i.duration?.match(/\d+/)?.[0] || "0", 10)), 0);
    setIsPro(totalMonths >= 3);
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("assessmentScore"));
    if (stored?.score !== undefined && stored.posted) setAssessmentScore(stored.score);
  }, []);

  const handleCompanyFilterChange = e => {
    const { name, value } = e.target;
    setCompanyFilter(f => ({ ...f, [name]: value }));
  };

  const filteredCompanies = allSuggestedCompanies.filter(c => {
    return (
      (!companyFilter.industry || c.industry === companyFilter.industry) &&
      (!companyFilter.company || c.name === companyFilter.company) &&
      (!selectedInterests || c.industry === selectedInterests) &&
      c.name.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const sortedCompanies = filteredCompanies.sort((a, b) => b.recommendations - a.recommendations);

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
    <div style={styles.container}>
      {/* Animated Navbar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 w-full bg-[#00106A] py-6 px-6 flex items-center justify-between"
      >
        <div className="w-1/3"></div>
        <div className="w-1/3 text-center">
          <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
        </div>
        <div className="w-1/3 flex justify-end space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold py-2 px-4 rounded-lg shadow transition-all duration-300"
            onClick={() => (window.location.href = "/student")}
          >
            Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-red-500 to-red-400 text-white py-2 px-4 rounded-lg shadow transition-all duration-300"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </motion.button>
        </div>
      </motion.div>

      <div style={styles.content}>
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: "left", marginBottom: 10, fontWeight: "bold" }}
        >
          Student Dashboard {isPro && <span style={{ color: "gold" }}>⭐ PRO</span>}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 style={{ textAlign: "left" }}>Major: {selectedMajor}</h3>
          <h3 style={{ textAlign: "left" }}>Semester: {selectedSemester}</h3>
        </motion.div>

        {assessmentScore !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ marginTop: 10, color: "#2b7de9" }}
          >
            🧠 Latest Assessment Score: <strong>{assessmentScore} / 100</strong>
          </motion.div>
        )}

        {/* Dashboard Links */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
          style={{ ...styles.cardContainer, marginBottom: 30 }}
        >
          {dashboardLinks.map(link => (
            <motion.div
              key={link.label}
              variants={cardVariants}
              whileHover="hover"
            >
              <Link to={link.path} style={{ textDecoration: "none" }}>
                <div style={styles.dashboardCard}>
                  <h4 style={{ margin: 0, color: "#2b7de9" }}>{link.label}</h4>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Suggested Companies */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          style={styles.heading}
        >
          Suggested Companies Based on Your Job Interests
        </motion.h2>

        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          type="text"
          placeholder="Search company by name..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={styles.searchInput}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={styles.filterContainer}
        >
          <select
            name="industry"
            value={companyFilter.industry}
            onChange={handleCompanyFilterChange}
            style={styles.filterSelect}
          >
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Engineering">Engineering</option>
            <option value="Pharmaceutical">Pharmaceutical</option>
            <option value="Business">Business</option>
          </select>
          <select
            name="company"
            value={companyFilter.company}
            onChange={handleCompanyFilterChange}
            style={styles.filterSelect}
          >
            <option value="">All Companies</option>
            {allSuggestedCompanies
              .filter(c => !companyFilter.industry || c.industry === companyFilter.industry)
              .map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
          </select>
        </motion.div>

        {/* Company Cards */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
          style={styles.cardContainer}
        >
          {sortedCompanies.length > 0 ? (
            sortedCompanies.map((company, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover="hover"
                style={styles.card}
              >
                <h3>{company.name} 🏢</h3>
                <p><strong>Industry:</strong> {company.industry} 🌐</p>
                <p><strong>Recommendations:</strong> {company.recommendations} / 5 ⭐</p>
                <Link to={`/student/company/${company.name}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    style={styles.button}
                  >
                    View Profile
                  </motion.button>
                </Link>
              </motion.div>
            ))
          ) : (
            <p style={styles.noData}>No companies match your filters.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f9",
    paddingTop: "100px",
    width: "100%",
  },
  content: {
    textAlign: "center",
    padding: "20px",
    width: "80%",
    maxWidth: "1000px",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "left",
  },
  dashboardCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    cursor: "pointer",
    transition: "0.3s",
  },
  button: {
    backgroundColor: "#2b7de9",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "10px",
  },
  noData: {
    color: "grey",
    fontSize: "16px",
    textAlign: "center",
  },
  heading: {
    marginTop: "30px",
    marginBottom: "10px",
    textAlign: "left",
    color: "#444",
  },
  filterContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  filterSelect: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  searchInput: {
    padding: "10px",
    width: "50%",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    fontSize: "16px",
  },
};
