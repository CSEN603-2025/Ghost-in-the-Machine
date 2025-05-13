import React, { useState } from 'react';

const EnrolledWorkshopCard = ({ workshop }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{workshop.name}</h3>
      <button style={styles.button} onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'How to Attend'}
      </button>
      {showDetails && (
        <div style={styles.details}>
          <p><strong>Date & Time:</strong> {workshop.time}</p>
          {workshop.method === 'Online' ? (
            <p><strong>Online Link:</strong> <a href={workshop.venueOrLink} target="_blank" rel="noopener noreferrer">{workshop.venueOrLink}</a></p>
          ) : (
            <p><strong>Venue:</strong> {workshop.venueOrLink}</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '12px',
  },
  title: {
    margin: '0 0 10px 0',
    color: '#2b7de9',
  },
  button: {
    backgroundColor: '#2b7de9',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  details: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '4px',
  },
};

export default EnrolledWorkshopCard;
