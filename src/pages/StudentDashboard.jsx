import React, { useEffect, useState } from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import StatusHeader from "../components/dashboard/StatusHeader";
import DashboardLinkCard from "../components/dashboard/DashboardLinkCard";
import SearchBar from "../components/SearchBar";
import CompanyFilter from "../components/dashboard/CompanyFilter";
import CompanyCard from "../components/dashboard/CompanyCard";

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
    <>
      <DashboardNavbar />
      <div style={styles.container}>
        <div style={styles.content}>

          {/* Profile Section */}
          <div style={styles.section}>
            <StatusHeader major={'DMET'} semester={'6th'} />
            {assessmentScore !== null && (
              <div style={{ marginTop: '10px', color: '#2b7de9' }}>
                🧠 Latest Assessment Score: <strong>{assessmentScore} / 100</strong>
              </div>
            )}
          </div>

          {/* Links Section */}
          <div style={styles.section}>
            <div style={{ ...styles.cardContainer, marginBottom: '0' }}>
              {dashboardLinks.map((link) => (
                <DashboardLinkCard key={link.label} {...link} />
              ))}
            </div>
          </div>

          {/* Suggested Companies Section */}
          <div style={styles.section}>
            <h2 style={styles.heading}>Suggested Companies Based on Your Job Interests</h2>
            <div style={{ marginBottom: '15px' }}>
              <SearchBar
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeHolder="Search company by name..."
              />
            </div>
            <CompanyFilter
              companyFilter={companyFilter}
              onFilterChange={handleCompanyFilterChange}
              companies={allSuggestedCompanies}
            />
            <div style={styles.cardContainer}>
              {sortedCompanies.length > 0 ? (
                sortedCompanies.map((company) => (
                  <CompanyCard key={company.name} company={company} />
                ))
              ) : (
                <p style={styles.noData}>No companies match your current interests and filters.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

const styles = {
  section: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '20px',
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
};

export default StudentDashboard;
