import React, { useState, useEffect } from 'react'; // Added useEffect
import { useNavigate } from 'react-router-dom'; // Added useNavigate
// import DashboardNavbar from '../components/dashboard/DashboardNavbar'; // Removed
import DashboardTopNav from '../components/dashboard/DashboardTopNav'; // Added
import StatusHeader from '../components/dashboard/StatusHeader';
import ProWorkshopCard from '../components/dashboard/ProWorkshopCard';
import DashboardLinkCard from '../components/dashboard/DashboardLinkCard';
import SearchBar from '../components/SearchBar';
import CompanyFilter from '../components/dashboard/CompanyFilter';
import CompanyCard from '../components/dashboard/CompanyCard';
import EnrolledWorkshopCard from '../components/dashboard/EnrolledWorkshopCard';
import { useToastNotifications } from '../hooks/useToastNotifications';

// Add suggested companies list
const allSuggestedCompanies = [
  { name: 'Instabug', industry: 'Technology', recommendations: 5 },
  { name: 'Valeo', industry: 'Technology', recommendations: 4 },
  { name: 'IBM', industry: 'Technology', recommendations: 5 },
  { name: 'BizPros', industry: 'Business', recommendations: 3 },
];

// Hardcoded dummy workshops
const workshops = [
  { id: 1, name: 'CV Masterclass', speaker: 'Dr. Smith', date: '2025-05-20', description: 'Learn how to make your CV stand out.' },
  { id: 2, name: 'Interview Skills', speaker: 'Ms. Johnson', date: '2025-05-23', description: 'Ace your internship interviews.' }
];

const ProStudentDashboard = () => {
  // Hardcoded dummy student info
  const major = 'CSEN';
  const semester = '8th';
  const {success} = useToastNotifications();
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate(); // Added
  
      useEffect(() => {
      const timer = setTimeout(() => {
        const msg = "Next internship cycle starts on 1/Jun/2025. Don't miss out!";
        // show toast
        success(msg);
        // add to bell notification center
        setNotifications(prev => [...prev,{ id: Date.now(), message: msg, date: new Date() }]);
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

  const [registered, setRegistered] = useState([]);

  // Hardcoded dummy enrolled workshops
  const enrolledWorkshops = [
    { id: 3, name: 'React Basics (Recorded)', time: 'On Demand', method: 'Online', venueOrLink: 'https://example.com/recorded/react' },
    { id: 4, name: 'AI Ethics Seminar', time: '2025-06-05 10:00 AM', method: 'Venue', venueOrLink: 'Building A, Room 101' },
  ];

  

  // Student dashboard state for company search/filter
  const [searchText, setSearchText] = useState('');
  const [companyFilter, setCompanyFilter] = useState({ industry: '', company: '' });
  // Hardcoded dummy assessment score
  const assessmentScore = 85;

  // Dummy dashboard links
  const dashboardLinks = [
    { label: 'Internships', path: '/student/internships' },
    { label: 'My Applications', path: '/student/my-applications' },
    { label: 'Submit Report', path: '/student/report' },
    { label: 'Edit Profile', path: '/student/edit-profile' },
    { label: 'Evaluation', path: '/student/evaluation' },
    { label: 'SCAD Internships', path: '/student/scad-internships' },
    { label: 'View Reports', path: '/student/reports' },
    { label: 'Assessments', path: '/student/assessment' },
    { label: 'Viewed Profile', path: '/student/viewed-profile' },
    { label: 'Appointments', path: '/videocallpage' },
    { label: 'Workshops', path: '/pro-student-workshops' },

  ];

  // Handle filter changes
  const handleCompanyFilterChange = (e) => {
    const { name, value } = e.target;
    setCompanyFilter({ ...companyFilter, [name]: value });
  };

  // Filter and sort companies
  const filteredCompanies = allSuggestedCompanies.filter(c =>
    (companyFilter.industry === '' || c.industry === companyFilter.industry) &&
    (companyFilter.company === '' || c.name === companyFilter.company) &&
    c.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const sortedCompanies = filteredCompanies.sort((a, b) => b.recommendations - a.recommendations);

  const handleRegister = (workshop) => {
    if (!registered.find((w) => w.id === workshop.id)) {
      setRegistered((prev) => [...prev, workshop]);
      // TODO: send notification to user
    }
  };

  return (
    <>
      <DashboardTopNav portalTitle="Pro Student Portal" logoText="PR" />
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '20px auto' }}> {/* Adjusted top margin */}
        {/* Student Dashboard Section */}
        <div style={styles.section}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <StatusHeader major={major} semester={semester} />
            <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>⭐ PRO Student</span>
          </div>
          {assessmentScore !== null && (
            <div style={{ color: '#2b7de9', marginBottom: '10px' }}>
              🧠 Latest Assessment Score: <strong>{assessmentScore} / 100</strong>
            </div>
          )}
        </div>

        {/* Quick Links Section */}
        <div style={styles.section}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '12px' }}>
            {dashboardLinks.map(link => <DashboardLinkCard key={link.label} {...link} />)}
          </div>
        </div>

        {/* Suggested Companies Section */}
        <div style={styles.section}>
          <h2 style={styles.heading}>Suggested Companies Based on Your Interests</h2>
          <div style={{ marginBottom: '10px' }}>
            <SearchBar value={searchText} onChange={e => setSearchText(e.target.value)} placeHolder="Search companies..." />
          </div>
          <CompanyFilter companyFilter={companyFilter} onFilterChange={handleCompanyFilterChange} companies={allSuggestedCompanies} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px', marginTop: '12px' }}>
            {sortedCompanies.length > 0 ? sortedCompanies.map(c => <CompanyCard key={c.name} company={c} />) : <p style={{ textAlign: 'center', color: 'grey' }}>No matching companies.</p>}
          </div>
        </div>

        {/* Career Workshops Section */}
        <div style={styles.section}>
          <h2 style={styles.heading}>Online Career Workshops</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '12px' }}>
            {workshops.map(w => (
              <ProWorkshopCard
                key={w.id}
                workshop={w}
                isRegistered={registered.some(r => r.id === w.id)}
                onRegister={handleRegister}
              />
            ))}
          </div>
        </div>

        {/* Enrolled Workshops Section */}
        <div style={styles.section}>
          <h2 style={styles.heading}>Enrolled Workshops</h2>
          {[
            ...enrolledWorkshops,
            ...workshops.filter(w => registered.some(r => r.id === w.id))
          ].map(w => (
            <EnrolledWorkshopCard key={w.id} workshop={{ ...w, time: w.date || w.time, method: w.method || 'Online', venueOrLink: w.link || w.venueOrLink }} />
          ))}
        </div>
      </div>
    </>
  );
};

// Insert styles for sections and headings
const styles = {
  section: {
    backgroundColor: '#fff', padding: '18px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '16px'
  },
  heading: { margin: 0, fontSize: '1.25em', color: '#333', marginBottom: '12px' },
};

export default ProStudentDashboard;
