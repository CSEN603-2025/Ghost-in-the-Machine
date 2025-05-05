import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy internships
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
    title: "Marketing Intern",
    company: "P&G",
    duration: "1 Month",
    paid: true,
    industry: "Marketing",
  },
  {
    id: 4,
    title: "Accounting Assistant",
    company: "KPMG",
    duration: "2 Months",
    paid: false,
    industry: "Finance",
  },
];

const ScadInternshipsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [paidFilter, setPaidFilter] = useState("");

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/student/internship/${id}`);
  };

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry = industryFilter
      ? internship.industry === industryFilter
      : true;

    const matchesDuration = durationFilter
      ? internship.duration === durationFilter
      : true;

    const matchesPaid =
      paidFilter === ""
        ? true
        : paidFilter === "paid"
        ? internship.paid
        : !internship.paid;

    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
  });

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        💼 SCAD Internships
      </h2>

      {/* Search & Filters */}
      <div style={styles.filtersContainer}>
        <input
          type="text"
          placeholder="🔍 Search by title or company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />

        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">All Industries</option>
          <option value="Technology">Technology</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
        </select>

        <select
          value={durationFilter}
          onChange={(e) => setDurationFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">All Durations</option>
          <option value="1 Month">1 Month</option>
          <option value="2 Months">2 Months</option>
          <option value="3 Months">3 Months</option>
        </select>

        <select
          value={paidFilter}
          onChange={(e) => setPaidFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">All Types</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      {/* Internship Cards */}
      <div>
        {filteredInternships.length === 0 ? (
          <p>No internships found.</p>
        ) : (
          filteredInternships.map((internship) => (
            <div
              key={internship.id}
              style={styles.card}
              onClick={() => handleCardClick(internship.id)}
            >
              <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>
                📌 {internship.title}
              </h3>
              <p>
                <strong>🏢 Company:</strong> {internship.company}
              </p>
              <p>
                <strong>⏳ Duration:</strong> {internship.duration}
              </p>
              <p>
                <strong>💰 Paid:</strong> {internship.paid ? "Yes" : "No"}
              </p>
              <p>
                <strong>🏷️ Industry:</strong> {internship.industry}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  filtersContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    flex: "1 1 250px",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    flex: "1 1 180px",
  },
  card: {
    backgroundColor: "#fdfdfd",
    padding: "20px",
    marginBottom: "16px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
};

export default ScadInternshipsPage;
