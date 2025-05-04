import React from "react";

const MyApplicationsPage = () => {
  // Hardcoded internships with different statuses
  const hardcodedInternships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp",
      duration: "3 Months",
      status: "accepted", // Status: accepted
    },
    {
      id: 2,
      title: "Data Analyst Intern",
      company: "DataWorks",
      duration: "6 Months",
      status: "rejected", // Status: rejected
    },
      {
        id: 3,
        title: "Backend Intern",
        company: "Valeo",
        duration: "2 Months",
        status: "finalized", // Status: rejected
      },
    
    {
      id: 4,
      title: "UI/UX Design Intern",
      company: "Creative Design Studio",
      duration: "4 Months",
      status: "pending", // Status: pending
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Applications</h2>
      <div style={styles.cardContainer}>
        {hardcodedInternships.map((internship, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              backgroundColor: internship.status === "accepted" ? "#d4edda" : "#f0f0f0", // Green highlight for accepted internships
            }}
          >
            <h3>{internship.title}</h3>
            <p><strong>Company:</strong> {internship.company}</p>
            <p><strong>Duration:</strong> {internship.duration}</p>
            <p><strong>Status:</strong> {internship.status}</p>
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
    padding: "15px",
    borderRadius: "8px",
    width: "300px",
  },
};

export default MyApplicationsPage;
