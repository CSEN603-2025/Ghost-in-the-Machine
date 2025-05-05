import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FinalizedReport = () => {
  const [report, setReport] = useState({
    title: "",
    introduction: "",
    body: "",
    selectedCourses: [],
  });

  const [successMessage, setSuccessMessage] = useState(""); // State for the success message
  const navigate = useNavigate(); // Hook to navigate to another page

  // Fetch the saved report from localStorage
  useEffect(() => {
    const storedReport = JSON.parse(localStorage.getItem("studentReport"));
    if (storedReport) {
      setReport(storedReport);
    }
  }, []);

  // Ensure that selectedCourses is an array before calling .map()
  const selectedCourses = Array.isArray(report.selectedCourses)
    ? report.selectedCourses
    : [];

  const handleSubmit = () => {
    // Display success message
    setSuccessMessage("Report submitted successfully!");

    // Navigate to the Student Dashboard after 2 seconds
    setTimeout(() => {
      navigate("/student-dashboard");
    }, 2000); // Navigate after 2 seconds for the success message to show
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Finalized Report</h1>
      <h2 style={styles.reportTitle}>{report.title}</h2>
      <h3>Introduction</h3>
      <p>{report.introduction}</p>
      <h3>Body</h3>
      <p>{report.body}</p>

      <h3>Courses that helped you:</h3>
      <ul>
        {selectedCourses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>

      {/* Display the success message in green */}
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}

      <button style={styles.submitButton} onClick={handleSubmit}>
        Submit Report
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  reportTitle: {
    fontSize: "1.2em",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#2b7de9",
    color: "white",
    padding: "10px 20px",
    marginTop: "20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  successMessage: {
    color: "green",
    marginTop: "20px",
    fontWeight: "bold",
  },
};

export default FinalizedReport;
