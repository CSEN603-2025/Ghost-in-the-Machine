import React, { useState } from "react";
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
  const [internshipFilter, setInternshipFilter] = useState({
    industry: "",
    company: "",
    paid: "",
    duration: "",
  });

  const [companyFilter, setCompanyFilter] = useState({
    industry: "",
    company: "",
  });

  const handleMajorChange = (e) => setSelectedMajor(e.target.value);
  const handleSemesterChange = (e) => setSelectedSemester(e.target.value);
  const handleInterestsChange = (e) => setSelectedInterests(e.target.value);

  const handleInternshipSearch = (e) => setInternshipSearch(e.target.value);

  const handleInternshipFilterChange = (e) => {
    const { name, value } = e.target;
    setInternshipFilter({ ...internshipFilter, [name]: value });
  };

  const handleCompanyFilterChange = (e) => {
    const { name, value } = e.target;
    setCompanyFilter({ ...companyFilter, [name]: value });
  };

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(internshipSearch.toLowerCase()) ||
      internship.company.toLowerCase().includes(internshipSearch.toLowerCase());

    const matchesFilter =
      (internshipFilter.industry === "" || internship.industry === internshipFilter.industry) &&
      (internshipFilter.company === "" || internship.company === internshipFilter.company) &&
      (internshipFilter.paid === "" || internship.paid.toString() === internshipFilter.paid) &&
      (internshipFilter.duration === "" || internship.duration === internshipFilter.duration);

    return matchesSearch && matchesFilter;
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
        </div>
      </nav>

      <div style={styles.content}>
        <input
          type="text"
          placeholder="Search internships..."
          value={internshipSearch}
          onChange={handleInternshipSearch}
          style={styles.searchInput}
        />

        <h2 style={styles.heading}>Suggested Internships for You</h2>

        {/* Internship Filters */}
        <div style={styles.filterContainer}>
          <select value={selectedMajor} onChange={handleMajorChange} style={styles.filterSelect}>
            <option value="">Select Major</option>
            {majorList.map((major, index) => (
              <option key={index} value={major}>{major}</option>
            ))}
          </select>

          <select value={selectedSemester} onChange={handleSemesterChange} style={styles.filterSelect}>
            <option value="">Select Semester</option>
            {semesterList.map((s) => (
              <option key={s} value={s}>Semester {s}</option>
            ))}
          </select>

          <select name="industry" value={internshipFilter.industry} onChange={handleInternshipFilterChange} style={styles.filterSelect}>
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Engineering">Engineering</option>
            <option value="Pharmaceutical">Pharmaceutical</option>
            <option value="Business">Business</option>
          </select>

          <select name="company" value={internshipFilter.company} onChange={handleInternshipFilterChange} style={styles.filterSelect}>
            <option value="">All Companies</option>
            {allSuggestedCompanies.map((company) => (
              <option key={company.name} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>

          <select name="paid" value={internshipFilter.paid} onChange={handleInternshipFilterChange} style={styles.filterSelect}>
            <option value="">All Paid Status</option>
            <option value="true">Paid</option>
            <option value="false">Unpaid</option>
          </select>

          <select name="duration" value={internshipFilter.duration} onChange={handleInternshipFilterChange} style={styles.filterSelect}>
            <option value="">All Durations</option>
            <option value="2 Months">2 Months</option>
            <option value="3 Months">3 Months</option>
            <option value="4 Months">4 Months</option>
          </select>
        </div>

        {/* Internship Cards */}
        <div style={styles.cardContainer}>
          {filteredInternships.map((internship) => (
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
          ))}
        </div>

        <h2 style={styles.heading}>Suggested Companies Based on Your Job Interests</h2>

        {/* Company Filters */}
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
          {sortedCompanies.map((company, index) => (
            <div key={index} style={styles.card}>
              <h3>{company.name}</h3>
              <p><strong>Industry:</strong> {company.industry}</p>
              <p><strong>Recommendations:</strong> {company.recommendations} / 5</p>
              <Link to={`/student/company/${company.name}`}>
                <button style={styles.button}>View Details</button>
              </Link>
            </div>
          ))}
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
    borderRadius: "5px",
    padding: "8px 12px",
    marginLeft: "10px",
    cursor: "pointer",
    transition: "transform 0.1s ease-in-out",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "1.5em",
    marginBottom: "20px",
    color: "#444",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: "15px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  button: {
    backgroundColor: "#2b7de9",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "transform 0.1s ease-in-out",
  },
  searchInput: {
    padding: "12px",
    borderRadius: "5px",
    width: "80%",
    margin: "20px auto",
    display: "block",
    fontSize: "16px",
  },
  filterContainer: {
    marginBottom: "20px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
  },
  filterSelect: {
    padding: "10px",
    borderRadius: "5px",
    width: "200px",
  },
};

export default StudentDashboard;
