import React from 'react';
import { Link } from 'react-router-dom';

const CompanyCard = ({ company }) => (
  <div style={styles.card}>
    <h3>{company.name} 🏢</h3>
    <p><strong>Industry:</strong> {company.industry} 🌐</p>
    <p><strong>Recommendations:</strong> {company.recommendations} / 5 ⭐</p>
    <Link to={`/student/company/${company.name}`}>
      <button style={styles.button}>View Profile</button>
    </Link>
  </div>
);

const styles = {
  card: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#2b7de9',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default CompanyCard;
