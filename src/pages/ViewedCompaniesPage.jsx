import React, { useState, useEffect } from 'react';

const ViewedCompaniesPage = () => {
  const [viewedCompanies, setViewedCompanies] = useState([]);

  // Hardcoded Data for Testing
  useEffect(() => {
    // Simulating companies that viewed the student's profile
    const companies = [
      "Tech Corp",
      "Innovate Solutions",
      "Global Enterprises",
      "Creative Labs"
    ];
    setViewedCompanies(companies);
  }, []);

  return (
    <div style={styles.container}>
      <h1>Companies That Viewed Your Profile</h1>
      <div style={styles.listContainer}>
        {viewedCompanies.length > 0 ? (
          viewedCompanies.map((company, index) => (
            <div key={index} style={styles.companyCard}>
              <h3>{company}</h3>
            </div>
          ))
        ) : (
          <p>No companies have viewed your profile yet.</p>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  listContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
    marginTop: '20px',
  },
  companyCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default ViewedCompaniesPage;
