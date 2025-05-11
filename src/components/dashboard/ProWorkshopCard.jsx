import React from 'react';

const ProWorkshopCard = ({ workshop, isRegistered, onRegister }) => (
  <div style={styles.card}>
    <h3>{workshop.name}</h3>
    <p><strong>Speaker:</strong> {workshop.speaker}</p>
    <p><strong>Date:</strong> {workshop.date}</p>
    <p>{workshop.description}</p>
    <button
      style={isRegistered ? styles.registeredButton : styles.registerButton}
      onClick={() => onRegister(workshop)}
      disabled={isRegistered}
    >
      {isRegistered ? 'Registered' : 'Register'}
    </button>
  </div>
);

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'left',
  },
  registerButton: {
    backgroundColor: '#2b7de9',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  registeredButton: {
    backgroundColor: '#ccc',
    color: '#666',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'not-allowed',
  },
};

export default ProWorkshopCard;
