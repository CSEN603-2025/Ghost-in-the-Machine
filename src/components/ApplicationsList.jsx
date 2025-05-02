// src/components/ApplicationsList.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy applications data
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

function ApplicationsList({ posts }) {
  const navigate = useNavigate();

  const [applications, setApplications] = useState(dummyApplications);
  const [selectedPost, setSelectedPost] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchName, setSearchName] = useState('');

  const handleStatusChange = (id, newStatus) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const filteredApplications = applications.filter(app => {
    const matchesPost = selectedPost === '' || app.internshipTitle === selectedPost;
    const matchesStatus = selectedStatus === '' || app.status === selectedStatus;
    const matchesName = app.studentName.toLowerCase().includes(searchName.toLowerCase());
    return matchesPost && matchesStatus && matchesName;
  });

  return (
    <div style={styles.container}>
      <h2>Applications Management</h2>

      {/* Filters */}
      <div style={styles.filters}>
        <select style={styles.input} value={selectedPost} onChange={(e) => setSelectedPost(e.target.value)}>
          <option value="">Filter by Internship</option>
          {[...new Set(applications.map(app => app.internshipTitle))].map((title, index) => (
            <option key={index} value={title}>{title}</option>
          ))}
        </select>

        <select style={styles.input} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Finalized">Finalized</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Current Intern">Current Intern</option>
          <option value="Internship Complete">Internship Complete</option>
        </select>

        <input
          style={styles.input}
          type="text"
          placeholder="Search by Student Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      {/* Applications List */}
      <div style={styles.applicationsContainer}>
        {filteredApplications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          filteredApplications.map(app => (
            <div key={app.id} style={styles.applicationCard}>
              <h3>{app.studentName}</h3>
              <p><strong>Major:</strong> {app.major}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phone}</p>
              <p><strong>CV:</strong> {app.cv}</p>
              <p><strong>Internship:</strong> <span onClick={() => navigate(`/applications/${app.internshipTitle.replace(/\s+/g, '-').toLowerCase()}`)} style={styles.linkText}>{app.internshipTitle}</span></p>
              <p><strong>Status:</strong> {app.status}</p>

              {/* Status Update Buttons */}
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
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  filters: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minWidth: '200px',
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
  linkText: {
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
  }
};

export default ApplicationsList;
