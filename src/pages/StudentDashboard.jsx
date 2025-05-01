import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const applications = [
  { internshipId: 1, status: "pending" },
  { internshipId: 2, status: "accepted" },
  { internshipId: 3, status: "rejected" },
];

const suggestedCompanies = [
  { id: 1, name: "Valeo", industry: "Technology", location: "Cairo" },
  { id: 2, name: "IBM", industry: "Technology", location: "Cairo" },
  { id: 3, name: "Instabug", industry: "Technology", location: "Cairo" },
];

const majors = [
  { id: 1, name: "Computer Engineering" },
  { id: 2, name: "Business" },
  { id: 3, name: "Pharmacy" },
  { id: 4, name: "Management" },
];

const StudentDashboard = () => {
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ industry: "", paid: "", duration: "" });

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilter({ ...filter, [e.target.name]: e.target.value });
  const handleMajorChange = (e) => setSelectedMajor(e.target.value);
  const handleSemesterChange = (e) => setSelectedSemester(e.target.value);

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      (filter.industry === "" || internship.industry === filter.industry) &&
      (filter.paid === "" || internship.paid.toString() === filter.paid) &&
      (filter.duration === "" || internship.duration === filter.duration);
    return matchesSearch && matchesFilter;
  });

  const getApplicationStatus = (internshipId) => {
    const application = applications.find((app) => app.internshipId === internshipId);
    return application ? application.status : "Not Applied";
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <h2 style={styles.title}>GUC Internship System</h2>
        <div>
          <Link to="/student/internships"><button style={styles.navButton}>Internships</button></Link>
          <Link to="/student/applications"><button style={styles.navButton}>My Applications</button></Link>
          <Link to="/student/report"><button style={styles.navButton}>Submit Report</button></Link>
          <Link to="/student/edit-profile"><button style={styles.navButton}>Edit Profile</button></Link>
        </div>
      </nav>

      <div style={styles.container}>
        <div style={styles.selectionContainer}>
          <select value={selectedMajor} onChange={handleMajorChange} style={styles.input}>
            <option value="">Select Major</option>
            {majors.map((major) => (
              <option key={major.id} value={major.name}>{major.name}</option>
            ))}
          </select>

          <select value={selectedSemester} onChange={handleSemesterChange} style={styles.input}>
            <option value="">Select Semester</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((semester) => (
              <option key={semester} value={semester}>Semester {semester}</option>
            ))}
          </select>
        </div>

        <div style={{ ...styles.filterContainer, marginTop: "30px" }}>
          <input
            type="text"
            placeholder="Search Internships..."
            value={searchTerm}
            onChange={handleSearch}
            style={styles.input}
          />
          <select name="industry" value={filter.industry} onChange={handleFilterChange} style={styles.input}>
            <option value="">Filter by Industry</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
          </select>
          <select name="paid" value={filter.paid} onChange={handleFilterChange} style={styles.input}>
            <option value="">Paid/Unpaid</option>
            <option value="true">Paid</option>
            <option value="false">Unpaid</option>
          </select>
          <select name="duration" value={filter.duration} onChange={handleFilterChange} style={styles.input}>
            <option value="">Filter by Duration</option>
            <option value="3 Months">3 Months</option>
            <option value="2 Months">2 Months</option>
          </select>
        </div>

        <h2 style={styles.heading}>My Applications</h2>
        <div style={styles.cardContainer}>
          {internships.map((internship) => (
            <div key={internship.id} style={styles.card}>
              <h3>{internship.title}</h3>
              <p><strong>Company:</strong> {internship.company}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Status:</strong> {getApplicationStatus(internship.id)}</p>
              <Link to={`/student/internship/${internship.id}`}>
                <button style={styles.button}>View Details</button>
              </Link>
            </div>
          ))}
        </div>

        <h2 style={styles.heading}>Suggested Internships for You</h2>
        <div style={styles.cardContainer}>
          {filteredInternships.map((internship) => (
            <div key={internship.id} style={styles.card}>
              <h3>{internship.title}</h3>
              <p><strong>Company:</strong> {internship.company}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Paid:</strong> {internship.paid ? "Yes" : "No"}</p>
              <Link to={`/student/internship/${internship.id}`}>
                <button style={styles.button}>View Details</button>
              </Link>
            </div>
          ))}
        </div>

        <h2 style={styles.heading}>Recommended Companies</h2>
        <div style={styles.cardContainer}>
          {suggestedCompanies.map((company) => (
            <div key={company.id} style={styles.card}>
              <h3>{company.name}</h3>
              <p><strong>Industry:</strong> {company.industry}</p>
              <p><strong>Location:</strong> {company.location}</p>
              <Link to={`/student/company/${company.id}`}>
                <button style={styles.button}>View Company</button>
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
    borderBottom: "1px solid #eee",
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
    padding: "20px",
    textAlign: "center",
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    marginBottom: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "10px",
  },
  selectionContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  heading: {
    fontSize: "1.5em",
    marginBottom: "10px",
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
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "200px",
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
};

export default StudentDashboard;
