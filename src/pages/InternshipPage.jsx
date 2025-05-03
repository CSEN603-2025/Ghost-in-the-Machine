import React, { useEffect, useState } from "react";

const InternshipPage = () => {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInternship, setSelectedInternship] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentProfile"));
    if (stored?.internships) {
      setInternships(stored.internships);
      setFilteredInternships(stored.internships);
    }
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterInternships(e.target.value, statusFilter);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    filterInternships(search, e.target.value);
  };

  const filterInternships = (searchTerm, status) => {
    let filtered = internships.filter(
      (intern) =>
        intern.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (status !== "all") {
      filtered = filtered.filter((intern) => intern.status === status);
    }

    setFilteredInternships(filtered);
  };

  const handleSelectInternship = (index) => {
    setSelectedInternship(index);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={styles.title}>My Internships</h2>

      <input
        type="text"
        placeholder="Search by company or role"
        value={search}
        onChange={handleSearch}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "100%",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <select
        value={statusFilter}
        onChange={handleStatusChange}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "100%",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      >
        <option value="all">All</option>
        <option value="current">Current Internships</option>
        <option value="completed">Completed Internships</option>
      </select>

      {filteredInternships.length === 0 ? (
        <p>No internships found.</p>
      ) : (
        filteredInternships.map((intern, i) => (
          <div
            key={i}
            onClick={() => handleSelectInternship(i)}
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: selectedInternship === i ? "#f0f8ff" : "white", // Highlight selected internship
              cursor: "pointer",
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
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  title: {
    fontSize: "36px",  // Increased font size for prominence
    fontWeight: "bold",
    marginBottom: "20px",
  },
};

export default InternshipPage;
