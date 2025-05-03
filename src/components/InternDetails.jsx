import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApplicationsContext } from '../contexts/ApplicationsContext';

function InternDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, setApplications } = useContext(ApplicationsContext);

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
    setApplications((prev) =>
      prev.map((app) => (app.id === parseInt(id) ? { ...app, status } : app))
    );
    alert(`Status updated to: ${status}`);
    navigate(-1);
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
        <div style={styles.label}>Major:</div>
        <div>{intern.major}</div>
      </div>

      <div style={styles.info}>
        <div style={styles.label}>Email:</div>
        <div>{intern.email}</div>
      </div>

      <div style={styles.info}>
        <div style={styles.label}>Phone:</div>
        <div>{intern.phone}</div>
      </div>

      <div style={styles.info}>
        <div style={styles.label}>CV:</div>
        <div style={styles.cvLinks}>
          <a
            href={`/${intern.cv}`}
            download
            style={styles.linkButton}
          >
            Download CV
          </a>

          <a
            href={`/${intern.cv}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.linkButton}
          >
            Preview CV
          </a>
        </div>
      </div>

      <div style={styles.info}>
        <div style={styles.label}>Internship Title:</div>
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
    maxWidth: '700px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
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
  cvLinks: {
    display: 'flex',
    gap: '10px',
    marginTop: '5px',
  },
  linkButton: {
    display: 'inline-block',
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '14px',
  },
};

export default InternDetails;
