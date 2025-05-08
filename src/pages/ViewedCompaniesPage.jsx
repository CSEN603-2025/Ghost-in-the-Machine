import React, { useState, useEffect } from 'react';

const ViewedCompaniesPage = () => {
  const [viewedCompanies, setViewedCompanies] = useState([]);

  // Hardcoded Data for Testing
  useEffect(() => {
    // Simulating companies that viewed the student's profile
    const companies = [
      "Tech Corp",
      "Innovate Solutions",
      "Global Enterprises",
      "Creative Labs"
    ];
    setViewedCompanies(companies);
  }, []);

  return (
    <div style={styles.container}><div className="fixed top-0 left-0 right-0 z-50 w-full bg-[#00106A] py-6 px-6 flex items-center justify-between">

  {/* Empty div for spacing or future icons */}
  <div className="w-1/3" />

  {/* Centered Title */}
  <div className="w-1/3 text-center">
    <h1 className="text-3xl font-bold text-white">Companies that viewed my profile </h1>
  </div>

  {/* Home & Logout Buttons */}
  <div className="w-1/3 flex justify-end space-x-4">
    <button
      onClick={() => window.location.href = "/student"}
      className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] hover:from-[#00D6A0] hover:to-[#00F0B5] text-black font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
    >
      Home
    </button>
    <button
      onClick={() => {
        localStorage.clear();
        window.location.href = "/";
      }}
      className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300"
    >
      Logout
    </button>
  </div>
</div>

      <div style={styles.listContainer}>
        {viewedCompanies.length > 0 ? (
          viewedCompanies.map((company, index) => (
            <div key={index} style={styles.companyCard}>
              <h3>{company}</h3>
            </div>
          ))
        ) : (
          <p>No companies have viewed your profile yet.</p>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '100px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  listContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
    marginTop: '20px',
  },
  companyCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default ViewedCompaniesPage;
