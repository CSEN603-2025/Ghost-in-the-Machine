import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Valeo",
    duration: "3 Months",
    paid: true,
    industry: "Technology",
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "IBM",
    duration: "2 Months",
    paid: false,
    industry: "Technology",
  },
  {
    id: 3,
    title: "Mobile App Developer Intern",
    company: "Instabug",
    duration: "3 Months",
    paid: true,
    industry: "Technology",
  },
];

const allSuggestedCompanies = [
  { name: "Valeo", industry: "Technology", recommendations: 4.5 },
  { name: "IBM", industry: "Technology", recommendations: 4.0 },
  { name: "Instabug", industry: "Technology", recommendations: 4.8 },
  { name: "Microsoft", industry: "Technology", recommendations: 4.7 },
  { name: "Siemens", industry: "Engineering", recommendations: 4.3 },
  { name: "Pfizer", industry: "Pharmaceutical", recommendations: 4.2 },
  { name: "Google", industry: "Technology", recommendations: 4.6 },
  { name: "Coca-Cola", industry: "Business", recommendations: 4.1 },
  { name: "Tesla", industry: "Engineering", recommendations: 4.4 },
  { name: "Johnson & Johnson", industry: "Pharmaceutical", recommendations: 4.5 },
];

const majorList = ["Computer Engineering", "Business", "Pharmacy", "Management"];
const semesterList = Array.from({ length: 10 }, (_, i) => i + 1);

const StudentDashboard = () => {
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedInterests, setSelectedInterests] = useState("Technology");

  const [internshipSearch, setInternshipSearch] = useState("");

  const [companyFilter, setCompanyFilter] = useState({
    industry: "",
    company: "",
  });

  // Retrieve major and semester from localStorage
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("studentProfile")) || {};
    setSelectedMajor(profile.major || "");
    setSelectedSemester(profile.semester || "");
  }, []);

  const handleMajorChange = (e) => setSelectedMajor(e.target.value);
  const handleSemesterChange = (e) => setSelectedSemester(e.target.value);
  const handleInterestsChange = (e) => setSelectedInterests(e.target.value);
  const handleInternshipSearch = (e) => setInternshipSearch(e.target.value);

  const handleCompanyFilterChange = (e) => {
    const { name, value } = e.target;
    setCompanyFilter({ ...companyFilter, [name]: value });
  };

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(internshipSearch.toLowerCase()) ||
      internship.company.toLowerCase().includes(internshipSearch.toLowerCase());

    return matchesSearch;
  });

  const filteredCompanies = allSuggestedCompanies.filter((company) => {
    const matchesIndustry =
      companyFilter.industry === "" || company.industry === companyFilter.industry;
    const matchesCompany =
      companyFilter.company === "" || company.name === companyFilter.company;
    const matchesInterest =
      selectedInterests === "" || company.industry === selectedInterests;

    return matchesIndustry && matchesCompany && matchesInterest;
  });

  const sortedCompanies = filteredCompanies.sort(
    (a, b) => b.recommendations - a.recommendations
  );

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h2 style={styles.title}>GUC Internship System</h2>
        <div>
          <Link to="/student/internships"><button style={styles.navButton}>Internships</button></Link>
          <Link to="/student/my-applications"><button style={styles.navButton}>My Applications</button></Link>
          <Link to="/student/report"><button style={styles.navButton}>Submit Report</button></Link>
          <Link to="/student/edit-profile"><button style={styles.navButton}>Edit Profile</button></Link>
          <Link to="/student/scad-internships"><button style={styles.navButton}>SCAD Internships</button></Link>
        </div>
      </nav>

      <div style={styles.content}>
        <h1 style={{ textAlign: "left", marginBottom: "10px", fontWeight: "bold" }}>Student Dashboard</h1>

        {/* Display Major and Semester */}
        <h3 style={{ textAlign: "left" }}>Major: {selectedMajor}</h3>
        <h3 style={{ textAlign: "left" }}>Semester: {selectedSemester}</h3>

        <input
          type="text"
          placeholder="Search internships..."
          value={internshipSearch}
          onChange={handleInternshipSearch}
          style={styles.searchInput}
        />

        <h2 style={styles.heading}>Suggested Internships for You</h2>

        <div style={styles.cardContainer}>
          {filteredInternships.length > 0 ? (
            filteredInternships.map((internship) => (
              <div key={internship.id} style={styles.card}>
                <h3>{internship.title}</h3>
                <p><strong>Company:</strong> {internship.company}</p>
                <p><strong>Duration:</strong> {internship.duration}</p>
                <p><strong>Paid:</strong> {internship.paid ? "Yes" : "No"}</p>
                <p><strong>Industry:</strong> {internship.industry}</p>
                <Link to={`/student/internship/${internship.id}`}>
                  <button style={styles.button}>View Details</button>
                </Link>
              </div>
            ))
          ) : (
            <p style={styles.noData}>No internships found based on your search.</p>
          )}
        </div>

        <h2 style={styles.heading}>Suggested Companies Based on Your Job Interests</h2>

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

        <div style={styles.cardContainer}>
          {sortedCompanies.length > 0 ? (
            sortedCompanies.map((company, index) => (
              <div key={index} style={styles.card}>
                <h3>{company.name}</h3>
                <p><strong>Industry:</strong> {company.industry}</p>
                <p><strong>Recommendations:</strong> {company.recommendations} / 5</p>
                <Link to={`/student/company/${company.name}`}>
                  <button style={styles.button}>View Details</button>
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
  navButton: {
    backgroundColor: "#2b7de9",
    color: "white",
    border: "none",
    borderRadius: "20px",
    padding: "10px 16px",
    marginLeft: "10px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f9",
    paddingTop: "60px",
    width: "100%",
  },
  content: {
    textAlign: "center",
    padding: "20px",
    width: "80%",
    maxWidth: "1000px",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  },
  heading: {
    marginTop: "30px",
    marginBottom: "10px",
    textAlign: "left",
    color: "#333",
  },
  filterContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },
  filterSelect: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "200px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px", // Increase gap for better spacing
    justifyContent: "center",
    marginTop: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "30px",  // Increased padding to make the cards larger
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",  // Increased width for larger cards
    textAlign: "left",
    transition: "transform 0.3s ease-in-out",
  },
  cardHover: {
    transform: "scale(1.05)",
  },
  button: {
    backgroundColor: "#2b7de9",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
  noData: {
    color: "#888",
  },
};

export default StudentDashboard;
