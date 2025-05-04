// src/components/ApplicationsByPost.jsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Dummy applications data again
const dummyApplications = [
  {
    id: 1,
    studentName: 'Ahmed Ali',
    major: 'Computer Engineering',
    email: 'ahmed.ali@gmail.com',
    phone: '+201234567890',
    cv: 'CV_Ahmed.pdf',
    internshipTitle: 'Frontend Developer Intern',
    status: 'Pending',
  },
  {
    id: 2,
    studentName: 'Mona Saeed',
    major: 'Business Administration',
    email: 'mona.saeed@gmail.com',
    phone: '+201098765432',
    cv: 'CV_Mona.pdf',
    internshipTitle: 'Data Analyst Intern',
    status: 'Accepted',
  },
  {
    id: 3,
    studentName: 'Khaled Mostafa',
    major: 'Computer Science',
    email: 'khaled.mostafa@gmail.com',
    phone: '+201112223334',
    cv: 'CV_Khaled.pdf',
    internshipTitle: 'Mobile Developer Intern',
    status: 'Finalized',
  },
  {
    id: 4,
    studentName: 'Sarah Kamal',
    major: 'Marketing',
    email: 'sarah.kamal@gmail.com',
    phone: '+201234111222',
    cv: 'CV_Sarah.pdf',
    internshipTitle: 'Data Analyst Intern',
    status: 'Pending',
  },
];

function ApplicationsByPost() {
  const { postId } = useParams(); // get post title from URL
  const readableTitle = postId.replace(/-/g, ' '); // convert dash to space

  const [applications, setApplications] = useState(dummyApplications);

  const handleStatusChange = (id, newStatus) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const filteredApplications = applications.filter(
    app => app.internshipTitle.toLowerCase() === readableTitle.toLowerCase()
  );

  return (
    <div style={styles.container}>
      <h2>Applications for {readableTitle}</h2>

      {filteredApplications.length === 0 ? (
        <p>No applications found for this post.</p>
      ) : (
        <div style={styles.applicationsContainer}>
          {filteredApplications.map(app => (
            <div key={app.id} style={styles.applicationCard}>
              <h3>{app.studentName}</h3>
              <p><strong>Major:</strong> {app.major}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phone}</p>
              <p><strong>CV:</strong> {app.cv}</p>
              <p><strong>Status:</strong> {app.status}</p>

              {/* Status Buttons */}
              {app.status === 'Pending' && (
                <>
                  <button style={styles.actionButton} onClick={() => handleStatusChange(app.id, 'Finalized')}>Finalize</button>
                  <button style={styles.actionButton} onClick={() => handleStatusChange(app.id, 'Accepted')}>Accept</button>
                  <button style={styles.actionButton} onClick={() => handleStatusChange(app.id, 'Rejected')}>Reject</button>
                </>
              )}
              {app.status === 'Accepted' && (
                <button style={styles.actionButton} onClick={() => handleStatusChange(app.id, 'Current Intern')}>Set Current Intern</button>
              )}
              {app.status === 'Current Intern' && (
                <button style={styles.actionButton} onClick={() => handleStatusChange(app.id, 'Internship Complete')}>Set Complete</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  applicationsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  applicationCard: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    textAlign: 'left',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    position: 'relative',
  },
  actionButton: {
    marginTop: '8px',
    marginRight: '8px',
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ApplicationsByPost;
