import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApplicationsContext } from '../contexts/ApplicationsContext';
import { motion } from 'framer-motion';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Accepted: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  'Current Intern': 'bg-blue-100 text-blue-800',
  'Internship Complete': 'bg-gray-100 text-gray-700',
};

const ApplicationListPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { applications } = useContext(ApplicationsContext);

  const readableTitle = postId.replace(/-/g, ' ');
  const [nameSearch, setNameSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 6;

  const filteredApplications = applications.filter((app) => {
    const matchesTitle = app.internshipTitle.toLowerCase() === readableTitle.toLowerCase();
    const matchesName = app.studentName.toLowerCase().includes(nameSearch.toLowerCase());
    const matchesStatus = statusFilter === '' || app.status === statusFilter;
    return matchesTitle && matchesName && matchesStatus;
  });

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-[#00106A] text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">Applications for {readableTitle}</h1>
        <p className="text-xl text-blue-100">View and filter student applications</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <input
            type="text"
            value={nameSearch}
            onChange={(e) => {
              setNameSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-w-[200px]"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-w-[200px]"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Current Intern">Current Intern</option>
            <option value="Internship Complete">Internship Complete</option>
          </select>
        </div>

        {/* Application Cards */}
        {currentApplications.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-10">No applications found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {currentApplications.map((app) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition"
                onClick={() => navigate(`/applications/details/${app.id}`)}
              >
                <img
                  src={app.image}
                  alt={app.studentName}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover shadow-sm"
                />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#00106A]">{app.studentName}</h3>
                  <p className="text-sm text-gray-600">{app.major}</p>
                  <span className={`inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full ${statusColors[app.status]}`}>
                    {app.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Back */}
        <div className="text-center mt-10">
        <motion.button
  onClick={() => navigate(-1)}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05, x: -5 }}
  transition={{ duration: 0.3 }}
  className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800"
>
  ← Back
</motion.button>

        </div>
      </div>
    </div>
  );
};

export default ApplicationListPage;
