// src/pages/EditProfilePage.jsx
import React, { useState } from "react";

const EditProfilePage = () => {
  const [jobInterests, setJobInterests] = useState("");
  const [internships, setInternships] = useState([{ company: "", role: "", duration: "" }]);
  const [activities, setActivities] = useState("");

  const handleInternshipChange = (index, field, value) => {
    const updated = [...internships];
    updated[index][field] = value;
    setInternships(updated);
  };

  const addInternship = () => {
    setInternships([...internships, { company: "", role: "", duration: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved (mock functionality)!");
    console.log({ jobInterests, internships, activities });
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

        <label style={styles.label}>Previous Internships / Part-Time Jobs</label>
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
            <input
              placeholder="Duration"
              value={intern.duration}
              onChange={(e) => handleInternshipChange(i, "duration", e.target.value)}
              style={styles.input}
            />
          </div>
        ))}
        <button type="button" onClick={addInternship} style={styles.addButton}>+ Add Internship</button>

        <label style={styles.label}>College Activities</label>
        <textarea
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          placeholder="e.g., Member of Robotics Club, Hackathon Winner"
          style={styles.textarea}
        />

        <button type="submit" style={styles.submitButton}>Save Profile</button>
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
};

export default EditProfilePage;
