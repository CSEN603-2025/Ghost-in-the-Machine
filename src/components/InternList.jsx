import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyInterns = [
  { id: 1, name: 'Ahmed Ali', jobTitle: 'Frontend Developer', status: 'Current Intern' },
  { id: 2, name: 'Mona Saeed', jobTitle: 'Data Analyst', status: 'Internship Complete' },
  { id: 3, name: 'Sara Kamal', jobTitle: 'Backend Developer', status: 'Current Intern' },
  { id: 4, name: 'Omar Zaki', jobTitle: 'Security Engineer', status: 'Current Intern' },
  { id: 5, name: 'Laila Hossam', jobTitle: 'Product Manager', status: 'Internship Complete' },
  { id: 6, name: 'Mohamed Farid', jobTitle: 'DevOps Engineer', status: 'Current Intern' },
  { id: 7, name: 'Nora Adel', jobTitle: 'UX Designer', status: 'Internship Complete' },
];

function InternList() {
  const [interns, setInterns] = useState(dummyInterns);
  const [nameSearch, setNameSearch] = useState('');
  const [jobSearch, setJobSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const internsPerPage = 5;

  const handleNameSearchChange = (e) => {
    setNameSearch(e.target.value);
    setCurrentPage(1); // reset to first page when search changes
  };

  const handleJobSearchChange = (e) => {
    setJobSearch(e.target.value);
    setCurrentPage(1); // reset to first page when search changes
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1); // reset to first page when filter changes
  };

  const filteredInterns = interns.filter((intern) => {
    const matchesName = intern.name.toLowerCase().includes(nameSearch.toLowerCase());
    const matchesJob = intern.jobTitle.toLowerCase().includes(jobSearch.toLowerCase());
    const matchesStatus = filterStatus === 'All' || intern.status === filterStatus;
    return matchesName && matchesJob && matchesStatus;
  });

  const indexOfLastIntern = currentPage * internsPerPage;
  const indexOfFirstIntern = indexOfLastIntern - internsPerPage;
  const currentInterns = filteredInterns.slice(indexOfFirstIntern, indexOfLastIntern);

  const totalPages = Math.ceil(filteredInterns.length / internsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleInternClick = (internId) => {
    navigate(`/interns/${internId}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Intern List</h2>

      <input
        type="text"
        placeholder="Search by student name"
        value={nameSearch}
        onChange={handleNameSearchChange}
        style={styles.searchInput}
      />

      <input
        type="text"
        placeholder="Search by job title"
        value={jobSearch}
        onChange={handleJobSearchChange}
        style={styles.searchInput}
      />

      <select value={filterStatus} onChange={handleFilterChange} style={styles.selectInput}>
        <option value="All">All</option>
        <option value="Current Intern">Current Intern</option>
        <option value="Internship Complete">Internship Complete</option>
      </select>

      <div style={styles.internList}>
        {currentInterns.map((intern) => (
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

        {currentInterns.length === 0 && (
          <div style={styles.noResults}>No interns found.</div>
        )}
      </div>

      {/* Pagination */}
      {filteredInterns.length > internsPerPage && (
        <div style={styles.pagination}>
          <button style={styles.pageButton} onClick={handlePrevPage} disabled={currentPage === 1}>
             Prev
          </button>
          <span style={styles.pageNumber}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            style={styles.pageButton}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next 
          </button>
        </div>
      )}
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
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    gap: '10px',
  },
  pageButton: {
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  pageNumber: {
    fontSize: '16px',
  },
};

export default InternList;
