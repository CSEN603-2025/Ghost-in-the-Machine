import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationsContext } from '../contexts/ApplicationsContext';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Toast from '../components/Toast';


function ApplicationsList({ posts }) {
  const [toastMessage, setToastMessage] = useState('');
  const handleBack = () => {
  navigate('/dashboard'); 
};

  const navigate = useNavigate();
  const { applications, setApplications } = useContext(ApplicationsContext);
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);


  const [selectedPost, setSelectedPost] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 6;

  const handleStatusChange = (id, newStatus) => {
  setApplications(prev =>
    prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
  );

  setToastMessage(`Application marked as "${newStatus}"`);
};

  const getAllInternshipTitles = () => {
    const postTitles = posts.map(post => post.title);
    const appTitles = applications.map(app => app.internshipTitle);
    const combined = [...new Set([...postTitles, ...appTitles])];
    return combined;
  };

  const filteredApplications = applications.filter(app => {
    const matchesPost = selectedPost === '' || app.internshipTitle === selectedPost;
    const matchesStatus = selectedStatus === '' || app.status === selectedStatus;
    const matchesName = app.studentName.toLowerCase().includes(searchName.toLowerCase());
    return matchesPost && matchesStatus && matchesName;
  });

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Accepted: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
    Finalized: 'bg-blue-100 text-blue-800',
    'Current Intern': 'bg-indigo-100 text-indigo-800',
    'Internship Complete': 'bg-gray-100 text-gray-700'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {toastMessage && (
  <Toast
    message={toastMessage}
    type="info"
    containerProps={{ position: 'bottom-left' }}
  />
)}

      <motion.div className="relative overflow-hidden">
         <motion.button
    whileHover={{ x: -5 }}
    onClick={handleBack}
    className="absolute top-6 left-6 z-20 flex items-center text-white hover:underline"
  >
    <ArrowLeft className="mr-1 w-5 h-5" /> Back
  </motion.button>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95"></div>
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Manage Student Applications</h1>
          <p className="text-lg text-blue-100 mb-6">Filter, view, and update internship applications</p>

          <div className="flex flex-wrap justify-center gap-4">
            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedPost}
              onChange={(e) => {
                setSelectedPost(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Filter by Internship</option>
              {getAllInternshipTitles().map((title, index) => (
                <option key={index} value={title}>{title}</option>
              ))}
            </select>

            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Filter by Status</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Finalized">Finalized</option>
              <option value="Current Intern">Current Intern</option>
              <option value="Internship Complete">Internship Complete</option>
            </select>

            <input
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search by Student Name"
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentApplications.length === 0 ? (
            <p className="text-gray-600 text-center col-span-full">No applications found.</p>
          ) : (
            currentApplications.map(app => (
              <motion.div
                key={app.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition flex flex-col items-center"
                onClick={() => navigate(`/applications/details/${app.id}`)}
              >
                {app.image && (
                  <img
                    src={app.image}
                    alt={app.studentName}
                    className="w-20 h-20 rounded-full object-cover shadow mb-3 border-2 border-blue-600"
                  />
                )}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-[#00106A]">{app.studentName}</h3>
                  <p className="text-sm text-gray-600">{app.major}</p>
                  <span className={`inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full ${statusColors[app.status]}`}>
                    {app.status}
                  </span>
                </div>

                <div className="mt-auto flex flex-wrap justify-center gap-2">
                  {app.status === 'Pending' && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(app.id, 'Accepted');
                        }}
                        className="px-3 py-1 bg-green-700 text-white text-sm rounded-lg hover:bg-green-800"
                      >
                        Accept
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(app.id, 'Rejected');
                        }}
                        className="px-3 py-1 bg-red-700 text-white text-sm rounded-lg hover:bg-red-800"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {app.status === 'Accepted' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(app.id, 'Finalized');
                      }}
                      className="px-3 py-1 bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-800"
                    >
                      Finalize
                    </button>
                  )}
                  {app.status === 'Finalized' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(app.id, 'Current Intern');
                      }}
                      className="px-3 py-1 bg-indigo-700 text-white text-sm rounded-lg hover:bg-indigo-800"
                    >
                      Start Internship
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationsList;