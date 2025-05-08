import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const allSuggestedCompanies = [
  { name: "Instabug", industry: "Technology", recommendations: 5 },
  { name: "Valeo", industry: "Technology", recommendations: 4 },
  { name: "IBM", industry: "Technology", recommendations: 5 },
  { name: "BizPros", industry: "Business", recommendations: 3 },
];

const StudentDashboard = () => {
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedInterests, setSelectedInterests] = useState("Technology");
  const [companyFilter, setCompanyFilter] = useState({ industry: "", company: "" });
  const [searchText, setSearchText] = useState("");
  const [isPro, setIsPro] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState(null);

  useEffect(() => {
    const savedScore = localStorage.getItem("onlineAssessmentScore");
    if (savedScore) {
      setAssessmentScore(Number(savedScore));
    }
  }, []);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("studentProfile")) || {};
    setSelectedMajor(profile.major || "");
    setSelectedSemester(profile.semester || "");
  }, []);

  useEffect(() => {
    const lastSeenStatus = localStorage.getItem("lastSeenReportStatus");
    const currentStatus = localStorage.getItem("reportStatus");

    if (currentStatus && lastSeenStatus && currentStatus !== lastSeenStatus) {
      alert(`🔔 Your internship report status has changed to: ${currentStatus.toUpperCase()}`);
    }

    if (currentStatus) {
      localStorage.setItem("lastSeenReportStatus", currentStatus);
    }
  }, []);

  useEffect(() => {
    const internships = JSON.parse(localStorage.getItem("studentInternships")) || [];
    const totalMonths = internships
      .filter((i) => i.status === "completed")
      .reduce((sum, intern) => {
        const months = parseInt(intern.duration?.match(/\d+/)?.[0] || "0", 10);
        return sum + months;
      }, 0);

    setIsPro(totalMonths >= 3);
  }, []);

  useEffect(() => {
    const storedScore = JSON.parse(localStorage.getItem("assessmentScore"));
    if (storedScore && storedScore.score !== undefined && storedScore.posted === true) {
      setAssessmentScore(storedScore);
    }
  }, []);

  const handleCompanyFilterChange = (e) => {
    const { name, value } = e.target;
    setCompanyFilter({ ...companyFilter, [name]: value });
  };

  const filteredCompanies = allSuggestedCompanies.filter((company) => {
    const matchesIndustry = companyFilter.industry === "" || company.industry === companyFilter.industry;
    const matchesCompany = companyFilter.company === "" || company.name === companyFilter.company;
    const matchesInterest = selectedInterests === "" || company.industry === selectedInterests;
    const matchesSearch = company.name.toLowerCase().includes(searchText.toLowerCase());

    return matchesIndustry && matchesCompany && matchesInterest && matchesSearch;
  });

  const sortedCompanies = filteredCompanies.sort(
    (a, b) => b.recommendations - a.recommendations
  );

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
    <div style={styles.container}><div className="fixed top-0 left-0 right-0 z-50 w-full bg-[#00106A] py-6 px-6 flex items-center justify-between">

  {/* Empty div for spacing or future icons */}
  <div className="w-1/3" />

  {/* Centered Title */}
  <div className="w-1/3 text-center">
    <h1 className="text-3xl font-bold text-white">SCAD Dashboard</h1>
  </div>

  {/* Home & Logout Buttons */}
  <div className="w-1/3 flex justify-end space-x-4">
    <button
      onClick={() => window.location.href = "/student"}
      className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] hover:from-[#00D6A0] hover:to-[#00F0B5] text-black font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
    >
      Home
    </button>
    <button
      onClick={() => {
        localStorage.clear();
        window.location.href = "/";
      }}
      className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300"
    >
      Logout
    </button>
  </div>
</div>


      <div style={styles.content}>
        <h1 style={{ textAlign: "left", marginBottom: "10px", fontWeight: "bold" }}>
          Student Dashboard {isPro && <span style={{ color: "gold" }}>⭐ PRO</span>}
        </h1>

        <h3 style={{ textAlign: "left" }}>Major: {selectedMajor}</h3>
        <h3 style={{ textAlign: "left" }}>Semester: {selectedSemester}</h3>

        {/* Display assessment score here if posted */}
        {assessmentScore !== null && (
        <div style={{ marginTop: "10px", color: "#2b7de9" }}>
          🧠 Latest Assessment Score: <strong>{assessmentScore} / 100</strong>
        </div>
        )}

        <div style={{ ...styles.cardContainer, marginBottom: "30px" }}>
          {dashboardLinks.map((link) => (
            <Link to={link.path} key={link.label} style={{ textDecoration: "none" }}>
              <div style={styles.dashboardCard}>
                <h4 style={{ margin: 0, color: "#2b7de9" }}>{link.label}</h4>
              </div>
            </Link>
          ))}
        </div>


        {/* Suggested Companies Section */}
        <h2 style={styles.heading}>Suggested Companies Based on Your Job Interests</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search company by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={styles.searchInput}
        />

        {/* Filters */}
        <div style={styles.filterContainer}>
          <select name="industry" value={companyFilter.industry} onChange={handleCompanyFilterChange} style={styles.filterSelect}>
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Engineering">Engineering</option>
            <option value="Pharmaceutical">Pharmaceutical</option>
            <option value="Business">Business</option>
          </select>

          <select name="company" value={companyFilter.company} onChange={handleCompanyFilterChange} style={styles.filterSelect}>
            <option value="">All Companies</option>
            {allSuggestedCompanies
              .filter((c) => companyFilter.industry === "" || c.industry === companyFilter.industry)
              .map((company) => (
                <option key={company.name} value={company.name}>
                  {company.name}
                </option>
              ))}
          </select>
        </div>

        {/* Company Cards */}
        <div style={styles.cardContainer}>
          {sortedCompanies.length > 0 ? (
            sortedCompanies.map((company, index) => (
              <div key={index} style={styles.card}>
                <h3>{company.name} 🏢</h3>
                <p><strong>Industry:</strong> {company.industry} 🌐</p>
                <p><strong>Recommendations:</strong> {company.recommendations} / 5 ⭐</p>
                <Link to={`/student/company/${company.name}`}>
                  <button style={styles.button}>View Profile</button>
                </Link>
              </div>
            ))
          ) : (
            <p style={styles.noData}>No companies match your current interests and filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    backgroundColor: "white",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 10,
  },
  title: {
    color: "#444",
    margin: 0,
    fontWeight: "bold",
    fontSize: "1.5em",
  },
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
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
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

export default StudentDashboard;
