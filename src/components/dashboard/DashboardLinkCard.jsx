import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLinkCard = ({ label, path }) => (
  <Link to={path} style={{ textDecoration: 'none' }}>
    <div style={styles.card}>
      <h4 style={styles.label}>{label}</h4>
    </div>
  </Link>
);

const styles = {
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    transition: '0.3s',
  },
  label: {
    margin: 0,
    color: '#2b7de9',
  },
};

export default DashboardLinkCard;
