import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InternshipPage = () => {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [isProStudent, setIsProStudent] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentProfile"));
    if (stored?.internships) {
      const validInternships = stored.internships;
      setInternships(validInternships);
      setFilteredInternships(validInternships);

      // Calculate the total duration of completed internships
      const totalDuration = validInternships
        .filter(i => i.status === "completed")
        .reduce((acc, internship) => acc + internship.duration, 0);

      // If total duration is 3 months or more, show PRO badge
      if (totalDuration >= 3) {
        setIsProStudent(true);
      } else {
        setIsProStudent(false);
      }
    }
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearch(term);
    filterInternships(term, statusFilter, startDateFilter, endDateFilter);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setStatusFilter(status);
    filterInternships(search, status, startDateFilter, endDateFilter);
  };

  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDateFilter(date);
    filterInternships(search, statusFilter, date, endDateFilter);
  };

  const handleEndDateChange = (e) => {
    const date = e.target.value;
    setEndDateFilter(date);
    filterInternships(search, statusFilter, startDateFilter, date);
  };

  const filterInternships = (searchTerm, status, start, end) => {
    let filtered = internships.filter(
      (i) =>
        i.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (status === "current") {
      filtered = filtered.filter((i) => new Date(i.endDate) >= new Date());
    } else if (status === "completed") {
      filtered = filtered.filter((i) => new Date(i.endDate) < new Date());
    }

    if (start) {
      filtered = filtered.filter((i) => new Date(i.startDate) >= new Date(start));
    }

    if (end) {
      filtered = filtered.filter((i) => new Date(i.endDate) <= new Date(end));
    }

    setFilteredInternships(filtered);
  };

  return (
    <div style={{ padding: "30px" }}>
      {/* Navbar with conditionally rendered PRO badge */}
      <nav style={{ backgroundColor: "#fff", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ddd" }}>
        <h2 style={{ margin: 0, fontWeight: "bold", fontSize: "1.5em" }}>GUC Internship System</h2>
        {isProStudent && (
          <span style={{ color: "gold", fontSize: "18px" }}>⭐ PRO</span>
        )}
      </nav>

      <h2 style={styles.title}>💼 My Internships</h2>

      {isProStudent && (
        <div
          style={{
            backgroundColor: "#FFD700",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "20px",
            marginBottom: "20px",
          }}
        >
          🏅 PRO Student Badge
        </div>
      )}

      <input
        type="text"
        placeholder="🔍 Search by company or role"
        value={search}
        onChange={handleSearch}
        style={inputStyle}
      />

      <select value={statusFilter} onChange={handleStatusChange} style={inputStyle}>
        <option value="all">All</option>
        <option value="current">Current Internships</option>
        <option value="completed">Completed Internships</option>
      </select>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ flex: 1 }}>
          <label>📅 Start Date:</label>
          <input
            type="date"
            value={startDateFilter}
            onChange={handleStartDateChange}
            style={inputStyle}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>📅 End Date:</label>
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
            to={`/student/internship/${intern.id}`}
            style={{
              ...internshipStyle,
              backgroundColor: intern.status === "completed" ? "#d4edda" : "#fff",
            }}
          >
            <p>🏢 <strong>Company:</strong> {intern.company}</p>
            <p>👨‍💻 <strong>Role:</strong> {intern.role}</p>
            <p>⏱️ <strong>Duration:</strong> {intern.duration} months</p>
            <p>📌 <strong>Status:</strong> {intern.status}</p>
            <p>📆 <strong>Start Date:</strong> {intern.startDate}</p>
            <p>📆 <strong>End Date:</strong> {intern.endDate}</p>
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
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "12px",
  textDecoration: "none",
  color: "inherit",
  fontSize: "16px",
};

const styles = {
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
};

export default InternshipPage;
