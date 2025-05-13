import React, { useState, useEffect } from 'react';
import { useToastNotifications } from '../hooks/useToastNotifications';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import IncomingCallPrompt from '../components/IncomingCallPrompt';
import OnGoingCallPrompt from '../components/OnGoingCallPrompt';
import { FiArrowUpRight } from 'react-icons/fi';

const SCADDashboard = () => {
  const navigate = useNavigate();
  const [showIncoming, setShowIncoming] = useState(false);
  const [showOngoing, setShowOngoing] = useState(false);
  const [callStatus, setCallStatus] = useState('ringing');
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [activeHover, setActiveHover] = useState(null);

  // Auto-show incoming call after 5s (demo)
  useEffect(() => {
    const timer = setTimeout(() => setShowIncoming(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Toast helpers
  const { success, info } = useToastNotifications();
  // Auto-end call 5s after starting
  useEffect(() => {
    let endTimer;
    if (showOngoing && callStatus === 'in-progress') {
      endTimer = setTimeout(() => {
        setShowOngoing(false);
        info('John Doe left the call');
      }, 5000);
    }
    return () => clearTimeout(endTimer);
  }, [showOngoing, callStatus, info]);

  // Card data (including new Manage Workshops)
  const cards = [
    {
      title: "Appointments",
      desc: "Manage appointment requests and start calls.",
      route: "/VideoCallPage",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Manage Companies",
      desc: "Review and approve company applications with advanced filters.",
      route: "/manage-companies",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "View All Internships",
      desc: "Explore internships with real-time search and analytics.",
      route: "/view-all-internships",
      color: "from-blue-600 to-blue-700"
    },
    {
      title: "View All Students",
      desc: "Track student progress and internship status updates.",
      route: "/students",
      color: "from-blue-700 to-blue-800"
    },
    {
      title: "Manage Internship Cycle",
      desc: "Configure timelines and automate cycle workflows.",
      route: "/manage-internship-cycle",
      color: "from-blue-800 to-blue-900"
    },
    {
      title: "Manage Reports & Evaluations",
      desc: "Access internship reports and evaluation summaries.",
      route: "/evaluations-reports",
      color: "from-blue-800 to-blue-900"
    },
    {
      title: "Manage Workshops",
      desc: "Create, edit, and schedule career workshops.",
      route: "/workshops",
      color: "from-blue-800 to-blue-900"
    }
  ];

  // Separate the Appointments card for full-width display
  const [appointmentsCard, ...dashboardCards] = cards;

  // Call handlers (enhanced with toasts)
  const handleAcceptVideo = () => {
    setCallStatus('in-progress');
    setShowIncoming(false);
    setShowOngoing(true);
    success('Video call accepted');
  };
  const handleReject = () => {
    setShowIncoming(false);
    setShowOngoing(false);
    info('Call rejected');
  };
  const handleAcceptAudio = () => {
    setCallStatus('in-progress');
    setVideoEnabled(false);
    setShowIncoming(false);
    setShowOngoing(true);
    success('Audio call accepted');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* ToastContainer rendered globally in App.js */}
      {/* --- Premium Glass Navbar --- */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#00106A] to-[#00D6A0] flex items-center justify-center text-white font-bold mr-2">
              SC
            </div>
            <span className="text-xl font-bold text-gray-800">SCAD Admin</span>
          </div>

          {/* Buttons */}
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

      {/* --- Symmetrical Cards Grid --- */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dashboardCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              onMouseEnter={() => setActiveHover(index)}
              onMouseLeave={() => setActiveHover(null)}
              onClick={() => navigate(card.route)}
              className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 h-full flex flex-col border border-gray-100 ${
                activeHover === index ? 'ring-2 ring-opacity-30 ring-[#00D6A0]' : ''
              }`}
            >
              {/* Gradient Accent Bar */}
              <div className={`h-2 w-full bg-gradient-to-r ${card.color}`} />

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{card.title}</h3>
                <p className="text-gray-600 mb-4 flex-1">{card.desc}</p>
                <motion.div
                  animate={{ 
                    x: activeHover === index ? 5 : 0
                  }}
                  className="text-[#00D6A0] font-medium flex items-center"
                >
                  Open feature
                  <svg 
                    className="w-4 h-4 ml-1"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Full-width Appointments card row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
        >
          <motion.div
            key="appointments"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
            }}
            onClick={() => navigate(appointmentsCard.route)}
            className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 flex flex-col border border-gray-100"
          >
            <div className={`h-2 w-full bg-gradient-to-r ${appointmentsCard.color}`} />
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-gray-800 mb-3">{appointmentsCard.title}</h3>
              <p className="text-gray-600 mb-4 flex-1">{appointmentsCard.desc}</p>
              <div className="text-green-500 font-medium flex items-center">
                Open feature
                <FiArrowUpRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* --- Call Prompts --- */}
      <AnimatePresence>
        {showIncoming && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <IncomingCallPrompt
              participantName="John Doe"
              onAcceptVideo={handleAcceptVideo}
              onAcceptAudio={handleAcceptAudio}
              onReject={handleReject}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOngoing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            {/* Pop-out button */}
            <button
              onClick={() => navigate('/VideoCallPage')}
              className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow hover:bg-white"
            >
              <FiArrowUpRight size={20} />
            </button>
            <OnGoingCallPrompt
              callStatus={callStatus}
              participantName="John Doe"
              micEnabled={micEnabled}
              videoEnabled={videoEnabled}
              screenSharing={screenSharing}
              onEndCall={handleReject}
              onToggleMic={() => setMicEnabled(!micEnabled)}
              onToggleVideo={() => setVideoEnabled(!videoEnabled)}
              onToggleScreen={() => setScreenSharing(!screenSharing)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Live Activity Feed --- */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              "3 new companies applied",
              "5 internship matches completed",
              "Report generated: Student Evaluations Q1"
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start pb-2 border-b border-gray-100 last:border-0"
              >
                <div className="w-2 h-2 bg-[#00D6A0] rounded-full mt-2 mr-3" />
                <p className="text-gray-700">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SCADDashboard;
