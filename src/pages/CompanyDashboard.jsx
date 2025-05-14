import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyProfileCard from '../components/CompanyProfileCard';
import { useToastNotifications } from '../hooks/useToastNotifications';
import DashboardTopNav from '../components/dashboard/DashboardTopNav';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [activeSection, setActiveSection] = useState('home');
  const { success } = useToastNotifications();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log("Welcome to the Company Dashboard");
    const timer = setTimeout(() => {
      const msg = "Congrats, your application is now accepted and profile is activated! Check your email";
      // show toast
      success(msg);
      // add to bell notification center
      setNotifications(prev => [...prev,{ id: Date.now(), message: msg, date: new Date() }]);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const msg = "Ahmed Mohamed just applied for the DevOps Intern position";
      // show toast
      success(msg);
      // add to bell notification center
      setNotifications(prev => [
        ...prev,
        { id: Date.now(), message: msg, date: new Date() }
      ]);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const myCompany = {
    name: "Google LLC",
    industry: "Technology",
    size: "Corporate",
    email: "contact@google.com",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  };

  const cards = [
    {
      title: 'Posts',
      desc: 'Manage job posts and internship listings.',
      route: '/posts',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Applications',
      desc: 'Track and manage student applications.',
      route: '/applications',
      color: 'from-blue-600 to-blue-700',
    },
    {
      title: 'Interns',
      desc: 'Manage Interns and their progress.',
      route: '/interns',
      color: 'from-blue-700 to-blue-800',
    },
    {
      title: 'Evaluation',
      desc: 'Send and manage evaluations for interns.',
      route: '/evaluations',
      color: 'from-blue-800 to-blue-900',
    },
    {
      title: 'Email',
      desc: 'Manage and review internship emails.',
      route: '/email',
      color: 'from-blue-900 to-blue-950',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardTopNav portalTitle="Company Portal" logoText="CO" />
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Hi {myCompany.name}, welcome to the dashboard.</h2>
        </div> */}

        {/* Ensure this container has a lower z-index or the card itself is not trying to overlap with a higher z-index */}
        <div className="mb-8 flex justify-center relative z-10">
          <CompanyProfileCard companyInfo={myCompany} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6" // Changed lg:grid-cols-3 to lg:grid-cols-6
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              onClick={() => navigate(card.route)}
              // Added conditional col-span for lg screens
              className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 h-full flex flex-col border border-gray-100 ${index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}`}
            >
              <div className={`h-2 w-full bg-gradient-to-r ${card.color}`}></div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{card.title}</h3>
                <p className="text-gray-600 mb-4 flex-1">{card.desc}</p>
                <div className="text-[#00D6A0] font-medium flex items-center">
                  Open feature
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

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
