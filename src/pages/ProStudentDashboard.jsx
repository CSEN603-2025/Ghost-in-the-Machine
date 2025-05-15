// src/pages/ProStudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardTopNav from '../components/dashboard/DashboardTopNav';
import StatusHeader from '../components/dashboard/StatusHeader';
import SearchBar from '../components/SearchBar';
import CompanyFilter from '../components/dashboard/CompanyFilter';
import CompanyCard from '../components/dashboard/CompanyCard';
import ProWorkshopCard from '../components/dashboard/ProWorkshopCard';
import EnrolledWorkshopCard from '../components/dashboard/EnrolledWorkshopCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useToastNotifications } from '../hooks/useToastNotifications';
import IncomingCallPrompt from '../components/IncomingCallPrompt';
import OnGoingCallPrompt from '../components/OnGoingCallPrompt';
import { FiArrowUpRight } from 'react-icons/fi';

const allSuggestedCompanies = [
  { name: 'Instabug', industry: 'Technology', recommendations: 5 },
  { name: 'Valeo', industry: 'Technology', recommendations: 4 },
  { name: 'IBM', industry: 'Technology', recommendations: 5 },
  { name: 'BizPros', industry: 'Business', recommendations: 3 },
];

const workshops = [
  { id: 1, name: 'CV Masterclass', speaker: 'Dr. Smith', date: '2025-05-20', description: 'Learn how to make your CV stand out.' },
  { id: 2, name: 'Interview Skills', speaker: 'Ms. Johnson', date: '2025-05-23', description: 'Ace your internship interviews.' },
];

const enrolledWorkshops = [
  { id: 3, name: 'React Basics (Recorded)', time: 'On Demand', method: 'Online', venueOrLink: 'https://example.com/recorded/react' },
  { id: 4, name: 'AI Ethics Seminar', time: '2025-06-05 10:00 AM', method: 'Venue', venueOrLink: 'Building A, Room 101' },
];

export default function ProStudentDashboard() {
  const navigate = useNavigate();
  const { success } = useToastNotifications();
  const [registered, setRegistered] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [companyFilter, setCompanyFilter] = useState({ industry: '', company: '' });
  const [showIncoming, setShowIncoming] = useState(false);
  const [showOngoing, setShowOngoing] = useState(false);
  const [callStatus, setCallStatus] = useState('ringing');
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  // Profile load + toast
  useEffect(() => {
    const timer = setTimeout(() => {
      const msg = "Next internship cycle starts on 1/Jun/2025. Don't miss out!";
      success(msg);
    }, 3000);
    return () => clearTimeout(timer);
  }, [success]);

  // Dashboard links
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

  // Company filtering
  const handleCompanyFilterChange = e => {
    const { name, value } = e.target;
    setCompanyFilter(f => ({ ...f, [name]: value }));
  };
  const filteredCompanies = allSuggestedCompanies
    .filter(c =>
      (!companyFilter.industry || c.industry === companyFilter.industry) &&
      (!companyFilter.company  || c.name === companyFilter.company) &&
      c.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => b.recommendations - a.recommendations);

  // Workshop registration
  const handleRegister = w => {
    if (!registered.some(r => r.id === w.id)) {
      setRegistered(r => [...r, w]);
    }
  };

  // Card animation variants
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible:{ opacity: 1, y: 0 },
  };

  // Auto-show incoming call after 5s (demo)
  useEffect(() => {
    const timer = setTimeout(() => setShowIncoming(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-end call 5s after starting
  useEffect(() => {
    let endTimer;
    if (showOngoing && callStatus === 'in-progress') {
      endTimer = setTimeout(() => {
        setShowOngoing(false);
        success('John Doe left the call');
      }, 5000);
    }
    return () => clearTimeout(endTimer);
  }, [showOngoing, callStatus, success]);

  // Call handlers (same as SCADDashboard)
  const handleAcceptVideo = () => {
    setCallStatus('in-progress');
    setShowIncoming(false);
    setShowOngoing(true);
    success('Video call accepted');
  };
  const handleReject = () => {
    setShowIncoming(false);
    setShowOngoing(false);
    success('Call rejected');
  };
  const handleAcceptAudio = () => {
    setCallStatus('in-progress');
    setVideoEnabled(false);
    setShowIncoming(false);
    setShowOngoing(true);
    success('Audio call accepted');
  };

  return (
    <>
      <DashboardTopNav portalTitle="Pro Student Portal" logoText="PR" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Profile */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <StatusHeader major="CSEN" semester="8th" />
            <div className="mt-3 text-blue-600 font-medium">⭐ PRO Student</div>
          </div>

          {/* Dashboard Links (SCAD‑style cards) */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            >
              {dashboardLinks.map((link, i) => (
                <motion.div
                  key={i}
                  variants={variants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                  onClick={() => navigate(link.path)}
                  className="bg-white rounded-xl border border-gray-100 flex flex-col cursor-pointer overflow-hidden transition"
                >
                  <div className="h-2 w-full bg-gradient-to-r from-[#00106A] to-[#0038A0]" />
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{link.label}</h3>
                    <div className="flex-1" />
                    <div className="mt-4 text-[#00D6A0] font-medium">Open →</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Suggested Companies */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Suggested Companies</h2>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <SearchBar
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  placeHolder="Search companies..."
                />
              </div>
              <div className="min-w-[200px]">
                <CompanyFilter
                  companyFilter={companyFilter}
                  onFilterChange={handleCompanyFilterChange}
                  companies={allSuggestedCompanies}
                />
              </div>
            </div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {filteredCompanies.map((c, i) => (
                <motion.div
                  key={i}
                  variants={variants}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                >
                  <CompanyCard company={c} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Career Workshops */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Online Career Workshops</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {workshops.map(w => (
                <ProWorkshopCard
                  key={w.id}
                  workshop={w}
                  isRegistered={registered.some(r => r.id === w.id)}
                  onRegister={() => handleRegister(w)}
                />
              ))}
            </div>
          </div>

          {/* Enrolled Workshops */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Enrolled Workshops</h2>
            <div className="space-y-4">
              {[
                ...enrolledWorkshops,
                ...workshops.filter(w => registered.some(r => r.id === w.id))
              ].map(w => (
                <EnrolledWorkshopCard
                  key={w.id}
                  workshop={{
                    ...w,
                    time: w.date || w.time,
                    method: w.method || 'Online',
                    venueOrLink: w.link || w.venueOrLink
                  }}
                />
              ))}
            </div>
          </div>
          
        </div>
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
              onClick={() => navigate('/videocallpage')}
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
    </>
  );
}
