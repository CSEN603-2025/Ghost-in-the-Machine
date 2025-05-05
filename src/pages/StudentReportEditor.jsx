import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentReportEditor = () => {
  const [report, setReport] = useState({
    title: "",
    introduction: "",
    body: "",
    selectedCourses: [],
  });
  const [courses] = useState([
    "Data Base 1",
    "Gaming ",
    "Math 501",
    "theory",
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedReport = JSON.parse(localStorage.getItem("studentReport"));
    if (storedReport) {
      setReport({
        ...storedReport,
        selectedCourses: storedReport.selectedCourses || [], // Ensure it's always an array
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  const handleCourseSelection = (e) => {
    const { value } = e.target;
    const selected = report.selectedCourses || []; // Fallback to empty array
    const updatedCourses = selected.includes(value)
      ? selected.filter((course) => course !== value)
      : [...selected, value];
    setReport((prevReport) => ({
      ...prevReport,
      selectedCourses: updatedCourses,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("studentReport", JSON.stringify(report));
    alert("Report saved!");
  };

  const handleViewReport = () => {
    localStorage.setItem("studentReport", JSON.stringify(report));
    navigate("/student/view-report");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Edit Report</h1>
      <form>
        <input
          type="text"
          name="title"
          value={report.title}
          onChange={handleInputChange}
          placeholder="Report Title"
          style={styles.input}
        />
        <textarea
          name="introduction"
          value={report.introduction}
          onChange={handleInputChange}
          placeholder="Introduction"
          style={styles.textarea}
        />
        <textarea
          name="body"
          value={report.body}
          onChange={handleInputChange}
          placeholder="Body"
          style={styles.textarea}
        />

        <h3>Select Courses that helped you in your internship:</h3>
        <div style={styles.courses}>
          {courses.map((course, index) => (
            <label key={index} style={styles.courseLabel}>
              <input
                type="checkbox"
                value={course}
                checked={(report.selectedCourses || []).includes(course)}
                onChange={handleCourseSelection}
                style={styles.checkbox}
              />
              {course}
            </label>
          ))}
        </div>

        <button type="button" onClick={handleSave} style={styles.submitButton}>
          Save Report
        </button>
        <button
          type="button"
          onClick={handleViewReport}
          style={styles.submitButton}
        >
          View Report
        </button>
      </form>
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
  input: {
    width: "80%",
    padding: "10px",
    marginTop: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "80%",
    height: "150px",
    padding: "10px",
    marginTop: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  courses: {
    textAlign: "left",
    width: "80%",
    marginTop: "20px",
    marginLeft: "10%",
  },
  courseLabel: {
    display: "block",
    marginBottom: "10px",
  },
  checkbox: {
    marginRight: "10px",
  },
  submitButton: {
    backgroundColor: "#2b7de9",
    color: "white",
    padding: "10px 20px",
    marginTop: "20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
  },
};

export default StudentReportEditor;
