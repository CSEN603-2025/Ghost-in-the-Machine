import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApplicationsContext } from '../contexts/ApplicationsContext';

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, setApplications } = useContext(ApplicationsContext);

  const [application, setApplication] = useState(null);

  useEffect(() => {
    const selectedApplication = applications.find((app) => app.id === parseInt(id));
    if (selectedApplication) {
      setApplication(selectedApplication);
    }
  }, [id, applications]);

  const handleStatusChange = (newStatus) => {
    setApplications((prevApps) =>
      prevApps.map((app) =>
        app.id === parseInt(id) ? { ...app, status: newStatus } : app
      )
    );
    alert(`Status changed to: ${newStatus}`);
    navigate(-1);
  };

  if (!application) {
    return <div style={styles.container}>Application not found.</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Application Details</h2>

      <div style={styles.detailsBox}>
        <div style={styles.info}>
          <span style={styles.label}>Name:</span>
          <span>{application.studentName}</span>
        </div>

        <div style={styles.info}>
          <span style={styles.label}>Major:</span>
          <span>{application.major}</span>
        </div>

        <div style={styles.info}>
          <span style={styles.label}>Email:</span>
          <span>{application.email}</span>
        </div>

        <div style={styles.info}>
          <span style={styles.label}>Phone:</span>
          <span>{application.phone}</span>
        </div>

        <div style={styles.info}>
          <span style={styles.label}>Internship Title:</span>
          <span>{application.internshipTitle}</span>
        </div>

        <div style={styles.info}>
          <span style={styles.label}>Status:</span>
          <span>{application.status}</span>
        </div>

        <div style={styles.info}>
          <span style={styles.label}>CV:</span>
          <div style={styles.cvLinks}>
            <a
              href={`/${application.cv}`}
              download
              style={styles.linkButton}
            >
              Download CV
            </a>
            <a
              href={`/${application.cv}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.linkButton}
            >
              Preview CV
            </a>
          </div>
        </div>

        {/* Action Buttons based on status */}
        {application.status === 'Pending' && (
          <div style={styles.actions}>
            <button
              style={styles.acceptButton}
              onClick={() => handleStatusChange('Accepted')}
            >
              Accept
            </button>
            <button
              style={styles.rejectButton}
              onClick={() => handleStatusChange('Rejected')}
            >
              Reject
            </button>
          </div>
        )}

        {application.status === 'Accepted' && (
          <div style={styles.actions}>
            <button
              style={styles.acceptButton}
              onClick={() => handleStatusChange('Current Intern')}
            >
              Finalize
            </button>
          </div>
        )}

        <button onClick={() => navigate(-1)} style={styles.backButton}>
          Back to Applications
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    minHeight: '100vh',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  detailsBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '15px',
    width: '100%',
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    fontSize: '16px',
  },
  cvLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '5px',
    flexWrap: 'wrap',
  },
  linkButton: {
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '14px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  acceptButton: {
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  rejectButton: {
    padding: '10px 15px',
    backgroundColor: '#dc3545',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  backButton: {
    marginTop: '20px',
    width: '100%',
    padding: '12px',
    backgroundColor: '#888',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ApplicationDetails;