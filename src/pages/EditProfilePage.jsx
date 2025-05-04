import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const [jobInterests, setJobInterests] = useState("");
  const [internships, setInternships] = useState([
    { company: "", role: "", duration: "", startDate: "", endDate: "", status: "current" },
  ]);
  const [activities, setActivities] = useState("");
  const [major, setMajor] = useState(""); // New state for major
  const [semester, setSemester] = useState(""); // New state for semester

  const navigate = useNavigate();

  const handleInternshipChange = (index, field, value) => {
    const updated = [...internships];
    updated[index][field] = value;
    setInternships(updated);
  };

  const addInternship = () => {
    setInternships([
      ...internships,
      { company: "", role: "", duration: "", startDate: "", endDate: "", status: "current" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter out internships that don't have any valid data
    const validInternships = internships.filter((intern) => {
      return intern.company || intern.role || intern.duration || intern.startDate || intern.endDate;
    });

    // If there are valid internships, update the profile
    const storedProfile = JSON.parse(localStorage.getItem("studentProfile")) || {};
    const updatedInternships = [
      ...(storedProfile.internships || []),
      ...validInternships,
    ];

    const profileData = {
      jobInterests,
      internships: updatedInternships,
      activities,
      major,
      semester, // Save major and semester
    };

    localStorage.setItem("studentProfile", JSON.stringify(profileData));

    alert("Profile saved successfully!");
    navigate("/student-dashboard");
  };

  return (
    <div style={styles.container}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Job Interests</label>
        <input
          type="text"
          value={jobInterests}
          onChange={(e) => setJobInterests(e.target.value)}
          placeholder="e.g., Frontend Development, AI, Project Management"
          style={styles.input}
        />

        {/* Major Dropdown */}
        <label style={styles.label}>Major</label>
        <select
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          style={styles.input}
        >
          <option value="">Select your major</option>
          <option value="Computer Engineering">Computer Engineering</option>
          <option value="Business">Business</option>
          <option value="Pharmacy">Pharmacy</option>
          <option value="Management">Management</option>
        </select>

        {/* Semester Dropdown */}
        <label style={styles.label}>Semester</label>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          style={styles.input}
        >
          <option value="">Select your semester</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <label style={styles.label}>Internships</label>
        {internships.map((intern, i) => (
          <div key={i} style={styles.internshipBlock}>
            <input
              placeholder="Company"
              value={intern.company}
              onChange={(e) => handleInternshipChange(i, "company", e.target.value)}
              style={styles.input}
            />
            <input
              placeholder="Role"
              value={intern.role}
              onChange={(e) => handleInternshipChange(i, "role", e.target.value)}
              style={styles.input}
            />
            <div style={styles.inlineContainer}>
              <input
                placeholder="Duration"
                value={intern.duration}
                onChange={(e) => handleInternshipChange(i, "duration", e.target.value)}
                style={{ ...styles.input, flex: 1 }}
              />
              <select
                value={intern.status}
                onChange={(e) => handleInternshipChange(i, "status", e.target.value)}
                style={{ ...styles.input, flex: 1 }}
              >
                <option value="current">Current</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div style={styles.dateContainer}>
              <div style={styles.dateField}>
                <label style={styles.dateLabel}>Start Date</label>
                <input
                  type="date"
                  value={intern.startDate}
                  onChange={(e) => handleInternshipChange(i, "startDate", e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.dateField}>
                <label style={styles.dateLabel}>End Date</label>
                <input
                  type="date"
                  value={intern.endDate}
                  onChange={(e) => handleInternshipChange(i, "endDate", e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>
          </div>
        ))}
        <button type="button" onClick={addInternship} style={styles.addButton}>
          + Add Internship
        </button>

        <label style={styles.label}>College Activities</label>
        <textarea
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          placeholder="e.g., Member of Robotics Club, Hackathon Winner"
          style={styles.textarea}
        />

        <button type="submit" style={styles.submitButton}>
          Save Profile
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginTop: "20px",
    fontWeight: "bold",
    textAlign: "left",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    height: "100px",
    resize: "vertical",
    marginBottom: "20px",
  },
  internshipBlock: {
    marginBottom: "20px",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
  },
  inlineContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  addButton: {
    backgroundColor: "#eee",
    border: "1px dashed #aaa",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  submitButton: {
    backgroundColor: "#2b7de9",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  dateContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "10px",
  },
  dateField: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  dateLabel: {
    marginBottom: "5px",
    fontWeight: "normal", // not bold
  },
};

export default EditProfilePage;
