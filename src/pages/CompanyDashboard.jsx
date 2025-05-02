import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyProfileCard from '../components/CompanyProfileCard';
import PostsList from '../components/PostsList';
import ApplicationsList from '../components/ApplicationsList';
function CompanyDashboard() {
    const [activeSection, setActiveSection] = useState('home');
    const [posts, setPosts] = useState([]); // GLOBAL POSTS STATE
    const navigate = useNavigate();

    const myCompany = {
        name: "Google LLC",
        industry: "Technology",
        size: "Corporate",
        email: "contact@google.com",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    };

    const handleLogout = () => {
        navigate('/'); // back to login page
    };

    return (
        <div style={styles.pageContainer}>
            {/* Top Navbar */}
            <div style={styles.topNavbar}>
                <button style={styles.topNavButton} onClick={() => setActiveSection('home')}>Home</button>
                <button style={styles.topNavButton} onClick={handleLogout}>Logout</button>
            </div>

            {/* Greeting and Profile */}
            <div style={styles.greeting}>
                <h2>Hi {myCompany.name}, welcome to the dashboard.</h2>
            </div>

            <CompanyProfileCard companyInfo={myCompany} />

            {/* Second Navbar */}
            <div style={styles.secondNavbar}>
                <button style={styles.navButton} onClick={() => setActiveSection('posts')}>Posts</button>
                <button style={styles.navButton} onClick={() => setActiveSection('applications')}>Applications</button>
                <button style={styles.navButton} onClick={() => setActiveSection('interns')}>Interns</button>
                <button style={styles.navButton} onClick={() => setActiveSection('evaluation')}>Evaluation</button>
            </div>

            {/* Main Content */}
            <div style={styles.contentArea}>
                {activeSection === 'home' && <p>Welcome to the Home Section.</p>}
                {activeSection === 'posts' && <PostsList posts={posts} setPosts={setPosts} />}
                {activeSection === 'applications' && <ApplicationsList posts={posts} />}
                {activeSection === 'interns' && <p>Interns Section will be implemented soon.</p>}
                {activeSection === 'evaluation' && <p>Evaluation Section will be implemented soon.</p>}
            </div>
        </div>
    );
}

const styles = {
    pageContainer: {
        padding: '20px',
        textAlign: 'center',
    },
    topNavbar: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: '#333',
        padding: '10px 20px',
        marginBottom: '20px',
    },
    topNavButton: {
        marginLeft: '10px',
        padding: '8px 16px',
        fontSize: '14px',
        color: 'white',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    greeting: {
        marginBottom: '20px',
    },
    secondNavbar: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '20px',
        marginBottom: '30px',
    },
    navButton: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#555',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontWeight: 'bold',
    },
    contentArea: {
        marginTop: '20px',
    },
};

export default CompanyDashboard;
