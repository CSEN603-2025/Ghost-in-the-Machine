import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApplicationsContext } from '../contexts/ApplicationsContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const statusColor = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Accepted: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  'Current Intern': 'bg-blue-100 text-blue-800',
  'Internship Complete': 'bg-gray-100 text-gray-700',
};

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, setApplications } = useContext(ApplicationsContext);
  const [application, setApplication] = useState(null);

  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(''); // 'success' | 'error'

  useEffect(() => {
    const selected = applications.find((app) => app.id === parseInt(id));
    if (selected) setApplication(selected);
  }, [id, applications]);

  const handleStatusChange = (newStatus) => {
  setApplications((prev) =>
    prev.map((app) =>
      app.id === parseInt(id) ? { ...app, status: newStatus } : app
    )
  );

  setAlertMessage(`Status changed to: ${newStatus}`);
  setAlertType(newStatus === 'Rejected' ? 'error' : 'success');

  // Just hide the alert after 2 seconds without navigation
  setTimeout(() => {
    setAlertMessage(null);
  }, 2000);
};

  if (!application) return <div className="p-6 text-red-600">Application not found</div>;

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-6">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Popup Alert */}
          {alertMessage && (
            <div
              className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-md z-50 text-white text-sm font-medium transition-all duration-300
                ${alertType === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
            >
              {alertMessage}
            </div>
          )}

          <motion.button
            whileHover={{ x: -5 }}
            onClick={() => navigate(-1)}
            className="flex items-center text-[#00106A] hover:underline mb-4"
          >
            <ArrowLeft className="mr-1 w-4 h-4" /> Back to Applications
          </motion.button>

          <motion.div
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.img
              src={application.image}
              alt={application.studentName}
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
              layoutId={`student-image-${id}`}
              transition={{ duration: 0.3 }}
            />

            <h2 className="text-xl font-bold text-[#00106A]">{application.studentName}</h2>
            <p className="text-gray-600">{application.major}</p>
            <p className="text-sm text-gray-500 mb-4">{application.phone}</p>

            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Email:</strong> {application.email}</p>
              <p><strong>Internship Title:</strong> {application.internshipTitle}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`px-2 py-1 rounded text-sm font-medium ${statusColor[application.status]}`}>
                  {application.status}
                </span>
              </p>
              <p>
                <strong>CV:</strong>{' '}
                <a href={`/${application.cv}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>{' | '}
                <a href={`/${application.cv}`} download className="text-blue-600 hover:underline">Download</a>
              </p>
            </div>

            {application.status === 'Pending' && (
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => handleStatusChange('Accepted')}
                  className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange('Rejected')}
                  className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900"
                >
                  Reject
                </button>
              </div>
            )}

            {application.status === 'Accepted' && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => handleStatusChange('Current Intern')}
                  className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
                >
                  Finalize
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ApplicationDetails;
