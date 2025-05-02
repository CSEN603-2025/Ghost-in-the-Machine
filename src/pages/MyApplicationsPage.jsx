// src/pages/MyApplicationsPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const MyApplicationsPage = () => {
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

  const getApplicationStatus = (internshipId) => {
    const application = applications.find((app) => app.internshipId === internshipId);
    return application ? application.status : "Not Applied";
  };

  return (
    <div style={styles.container}>
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
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
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

export default MyApplicationsPage;
