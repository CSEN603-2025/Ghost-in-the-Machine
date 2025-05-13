import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyProfileCard from '../components/CompanyProfileCard';
import { motion } from 'framer-motion';
import { useToastNotifications } from '../hooks/useToastNotifications';
import { TbHomeStats } from 'react-icons/tb';

const CompanyDashboard = () => {
  const navigate = useNavigate();
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
      desc: 'Monitor intern assignments and performance.',
      route: '/interns',
      color: 'from-blue-700 to-blue-800',
    },
    {
      title: 'Evaluation',
      desc: 'Access submitted reports and evaluations.',
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
    <div className="min-h-screen">
      {/* --- Top Navbar --- */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-white bg-opacity-80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div 
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#00106A] to-[#00D6A0] flex items-center justify-center text-white font-bold mr-2">
              CO
            </div>
            <span className="text-xl font-bold text-gray-800">Company Portal</span>
          </div>

          <div className="flex space-x-3">
           <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all"
            >
              Home
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/welcome')}
              className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Hi {myCompany.name}, welcome to the dashboard.</h2>
        </div>

        <div className="mb-8 flex justify-center">
          <CompanyProfileCard companyInfo={myCompany} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
              className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 h-full flex flex-col border border-gray-100`}
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
