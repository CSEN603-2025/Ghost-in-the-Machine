import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy intern data (for now)
const dummyInterns = [
  { id: 1, name: 'Ahmed Ali', jobTitle: 'Frontend Developer', status: 'Current Intern' },
  { id: 2, name: 'Mona Saeed', jobTitle: 'Data Analyst', status: 'Internship Complete' },
  { id: 3, name: 'Sara Kamal', jobTitle: 'Backend Developer', status: 'Current Intern' },
];

function InternList() {
  const [interns, setInterns] = useState(dummyInterns);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredInterns = interns.filter((intern) => {
    const matchesSearch =
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'All' || intern.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleInternClick = (internId) => {
    navigate(`/interns/${internId}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Intern List</h2>

      <input
        type="text"
        placeholder="Search by name or job title"
        value={searchTerm}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />

      <select value={filterStatus} onChange={handleFilterChange} style={styles.selectInput}>
        <option value="All">All</option>
        <option value="Current Intern">Current Intern</option>
        <option value="Internship Complete">Internship Complete</option>
      </select>

      <div style={styles.internList}>
        {filteredInterns.map((intern) => (
          <div
            key={intern.id}
            style={styles.internCard}
            onClick={() => handleInternClick(intern.id)}
          >
            <div style={styles.internName}>{intern.name}</div>
            <div style={styles.internJob}>{intern.jobTitle}</div>
            <div style={styles.internStatus}>{intern.status}</div>
          </div>
        ))}

        {filteredInterns.length === 0 && (
          <div style={styles.noResults}>No interns found.</div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  selectInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  internList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  internCard: {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  internName: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  internJob: {
    fontSize: '16px',
    color: '#555',
  },
  internStatus: {
    fontSize: '14px',
    marginTop: '8px',
    color: '#888',
  },
  noResults: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#999',
  },
};

export default InternList;
