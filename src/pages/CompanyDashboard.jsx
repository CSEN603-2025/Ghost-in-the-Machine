import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import CompanyProfileCard from '../components/CompanyProfileCard';
import PostsList from '../components/PostsList';
import ApplicationsList from '../components/ApplicationsList';
import InternList from '../components/InternList'; // 🔵 IMPORT InternList
import EvaluationsList from '../components/EvaluationsList';
import { toast } from 'react-hot-toast';


function CompanyDashboard() {
  useEffect(() => {toast("Welcome to the Dashboard!");}, []);
  const [activeSection, setActiveSection] = useState('home');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const myCompany = {
    name: "Google LLC",
    industry: "Technology",
    size: "Corporate",
    email: "contact@google.com",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", // ✅ added company logo URL
  };
  

  const handleLogout = () => {
    navigate('/');
  };

  const navButtons = [
    {
      section: 'posts',
      label: 'Posts',
      Icon: ({ color }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      ),
    },
    {
      section: 'applications',
      label: 'Applications',
      Icon: ({ color }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2">
          <path d="M22 12V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7" />
          <path d="M22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7" />
          <polyline points="22,5 12,13 2,5" />
        </svg>
      ),
    },
    {
      section: 'interns',
      label: 'Interns',
      Icon: ({ color }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2">
          <path d="M22 12v7H2v-7" />
          <path d="M2 5l10-3 10 3-10 3z" />
          <path d="M6 12v5" />
        </svg>
      ),
    },
    {
      section: 'evaluation',
      label: 'Evaluation',
      Icon: ({ color }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2">
          <path d="M9 12h6" />
          <path d="M9 16h6" />
          <path d="M13 8h-2" />
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <path d="M9 2v4h6V2" />
        </svg>
      ),
    },
    {
      section: 'email',
      label: 'Email',
      Icon: ({ color }) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
          strokeWidth="2"
        >
          <path d="M4 4h16v16H4z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      onClick: () => navigate('/email'),
    },
  ];

  return (
    <div style={styles.pageContainer}>
      {/* Top Navbar */}
      <div style={styles.topNavbar}>
        <button style={styles.topNavButton} onClick={() => setActiveSection('home')}>Home</button>
        <button style={styles.topNavButton} onClick={handleLogout}>Logout</button>
      </div>

      {/* Greeting */}
      <div style={styles.greeting}>
        <h2>Hi {myCompany.name}, welcome to the dashboard.</h2>
      </div>

      {/* Company Profile */}
      <div style={styles.profileCardContainer}>
        <CompanyProfileCard companyInfo={myCompany} />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {navButtons.map(({ section, label, Icon }) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`relative inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-16 rounded-md px-5 group
              ${activeSection === section ? 'bg-[#274472] text-white' : 'bg-[#274472] text-white hover:bg-[#41729F]'}
            `}
          >
            <Icon color="#C3E0E5" />
            <span className="origin-left transition-transform">{label}</span>
          </button>
        ))}
      </div>

            {/* Main Content */}
            <div style={styles.contentArea}>
                {activeSection === 'home' && <p>Welcome to the Home Section.</p>}
                {activeSection === 'posts' && <PostsList posts={posts} setPosts={setPosts} />}
                {activeSection === 'applications' && <ApplicationsList posts={posts} />}
                {activeSection === 'interns' && <InternList />} {/* 🔵 Show InternList */}
                {activeSection === 'evaluation' && <EvaluationsList />}

            </div>
        </div>
    );
}

const styles = {
  pageContainer: {
    padding: '20px',
    minHeight: '100vh',
    textAlign: 'center',
    color: '#274472',
    backgroundColor: '#ffffff', // White background
  },
  topNavbar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#274472',
    padding: '10px 20px',
    marginBottom: '20px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  },
  topNavButton: {
    marginLeft: '10px',
    padding: '8px 16px',
    fontSize: '14px',
    color: 'white',
    backgroundColor: '#274472',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  greeting: {
    marginBottom: '20px',
  },
  profileCardContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  contentArea: {
    marginTop: '20px',
  },
};

export default CompanyDashboard;
