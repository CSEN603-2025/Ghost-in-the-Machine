import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApplicationsContext } from '../contexts/ApplicationsContext'; // Import the real context!

function InternDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, setApplications } = useContext(ApplicationsContext); // use Context

  const [intern, setIntern] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const selectedIntern = applications.find((i) => i.id === parseInt(id));
    if (selectedIntern) {
      setIntern(selectedIntern);
      setStatus(selectedIntern.status);
    }
  }, [id, applications]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSave = () => {
    // Actually update the global ApplicationsContext
    setApplications((prev) =>
      prev.map((app) => (app.id === parseInt(id) ? { ...app, status } : app))
    );
    alert(`Status updated to: ${status}`);
    navigate(-1); // Go back to InternList
  };

  if (!intern) {
    return <div style={styles.container}>Intern not found.</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Intern Details</h2>

      <div style={styles.info}>
        <div style={styles.label}>Name:</div>
        <div>{intern.studentName}</div>
      </div>

      <div style={styles.info}>
        <div style={styles.label}>Job Title:</div>
        <div>{intern.internshipTitle}</div>
      </div>

      <div style={styles.info}>
        <div style={styles.label}>Current Status:</div>
        <select value={status} onChange={handleStatusChange} style={styles.selectInput}>
          <option value="Current Intern">Current Intern</option>
          <option value="Internship Complete">Internship Complete</option>
        </select>
      </div>

      <button onClick={handleSave} style={styles.saveButton}>Save Status</button>

      <button onClick={() => navigate(-1)} style={styles.backButton}>Back to List</button>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  info: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  selectInput: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  saveButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  backButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#888',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default InternDetails;
