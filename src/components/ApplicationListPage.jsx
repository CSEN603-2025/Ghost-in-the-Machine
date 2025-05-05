import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApplicationsContext } from '../contexts/ApplicationsContext';

function ApplicationListPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { applications } = useContext(ApplicationsContext);

  const readableTitle = postId.replace(/-/g, ' ');

  const [nameSearch, setNameSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 5;

  const filteredApplications = applications.filter((app) => {
    const matchesTitle = app.internshipTitle.toLowerCase() === readableTitle.toLowerCase();
    const matchesName = app.studentName.toLowerCase().includes(nameSearch.toLowerCase());
    const matchesStatus = statusFilter === '' || app.status === statusFilter;
    return matchesTitle && matchesName && matchesStatus;
  });

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);

  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  const handleApplicationClick = (applicationId) => {
    navigate(`/applications/details/${applicationId}`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Applications for {readableTitle}</h2>

      {/* Filters */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search by Student Name"
          value={nameSearch}
          onChange={(e) => {
            setNameSearch(e.target.value);
            setCurrentPage(1);
          }}
          style={styles.input}
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={styles.input}
        >
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Current Intern">Current Intern</option>
          <option value="Internship Complete">Internship Complete</option>
        </select>
      </div>

      {/* Applications */}
      {currentApplications.length === 0 ? (
        <p style={styles.noApplications}>No applications found.</p>
      ) : (
        <div style={styles.applicationsContainer}>
          {currentApplications.map((app) => (
            <div
              key={app.id}
              style={styles.applicationCard}
              onClick={() => handleApplicationClick(app.id)}
            >
              <h3>{app.studentName}</h3>
              <p><strong>Major:</strong> {app.major}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phone}</p>
              <p><strong>Status:</strong> {app.status}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {filteredApplications.length > applicationsPerPage && (
        <div style={styles.pagination}>
          <button
            style={styles.pageButton}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
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

      {/* Back Button */}
      <button onClick={() => navigate(-1)} style={styles.backButton}>
        Back
      </button>
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
    marginTop: '20px',
  },
  applicationCard: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    textAlign: 'left',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  noApplications: {
    marginTop: '30px',
    fontSize: '18px',
    color: '#888',
  },
  backButton: {
    marginTop: '30px',
    padding: '10px 20px',
    backgroundColor: '#888',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
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

export default ApplicationListPage;