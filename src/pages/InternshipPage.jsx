import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InternshipPage = () => {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentProfile"));
    if (stored?.internships) {
      setInternships(stored.internships);
      setFilteredInternships(stored.internships);
    }
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterInternships(e.target.value, statusFilter, startDateFilter, endDateFilter);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    filterInternships(search, e.target.value, startDateFilter, endDateFilter);
  };

  const handleStartDateChange = (e) => {
    setStartDateFilter(e.target.value);
    filterInternships(search, statusFilter, e.target.value, endDateFilter);
  };

  const handleEndDateChange = (e) => {
    setEndDateFilter(e.target.value);
    filterInternships(search, statusFilter, startDateFilter, e.target.value);
  };

  const filterInternships = (searchTerm, status, startDate, endDate) => {
    let filtered = internships.filter(
      (intern) =>
        intern.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by status (current/completed)
    if (status === "current") {
      filtered = filtered.filter((intern) => {
        const endDate = new Date(intern.endDate);
        return endDate >= new Date(); // Show internships that have an endDate in the future
      });
    } else if (status === "completed") {
      filtered = filtered.filter((intern) => {
        const endDate = new Date(intern.endDate);
        return endDate < new Date(); // Show internships that have already completed
      });
    }

    // Filter by start date
    if (startDate) {
      filtered = filtered.filter((intern) => {
        const startDateObj = new Date(intern.startDate);
        return startDateObj >= new Date(startDate);
      });
    }

    // Filter by end date
    if (endDate) {
      filtered = filtered.filter((intern) => {
        const endDateObj = new Date(intern.endDate);
        return endDateObj <= new Date(endDate);
      });
    }

    setFilteredInternships(filtered);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={styles.title}>My Internships</h2>

      <input
        type="text"
        placeholder="Search by company or role"
        value={search}
        onChange={handleSearch}
        style={inputStyle}
      />

      <select
        value={statusFilter}
        onChange={handleStatusChange}
        style={inputStyle}
      >
        <option value="all">All</option>
        <option value="current">Current Internships</option>
        <option value="completed">Completed Internships</option>
      </select>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ flex: 1 }}>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDateFilter}
            onChange={handleStartDateChange}
            style={inputStyle}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label>End Date:</label>
          <input
            type="date"
            value={endDateFilter}
            onChange={handleEndDateChange}
            style={inputStyle}
          />
        </div>
      </div>

      {filteredInternships.length === 0 ? (
        <p>No internships found.</p>
      ) : (
        filteredInternships.map((intern, i) => (
          <Link
            key={i}
            to={`/student/internship/${intern.id}`} // Correct routing to details page
            style={{
              ...internshipStyle,
              backgroundColor: intern.status === "completed" ? "#d4edda" : "#ffffff", // Highlight completed internships in green
            }}
          >
            <p>
              <strong>Company:</strong> {intern.company}
            </p>
            <p>
              <strong>Role:</strong> {intern.role}
            </p>
            <p>
              <strong>Duration:</strong> {intern.duration}
            </p>
            <p>
              <strong>Status:</strong> {intern.status}
            </p>
            <p>
              <strong>Start Date:</strong> {intern.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {intern.endDate}
            </p>
          </Link>
        ))
      )}
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  marginBottom: "20px",
  width: "100%",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const internshipStyle = {
  display: "block",
  marginBottom: "20px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer",
};

const styles = {
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
};

export default InternshipPage;
