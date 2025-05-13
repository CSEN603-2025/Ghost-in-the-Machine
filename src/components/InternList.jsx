import React, { useState, useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationsContext } from '../contexts/ApplicationsContext';
import { motion } from 'framer-motion';

const statusColors = {
  'Current Intern': 'bg-blue-100 text-blue-800',
  'Internship Complete': 'bg-gray-100 text-gray-700',
};

function InternList() {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const { applications } = useContext(ApplicationsContext);
  const [nameSearch, setNameSearch] = useState('');
  const [jobSearch, setJobSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const internsPerPage = 6;

  const filteredInterns = applications.filter((intern) => {
    const matchesStatus =
      (filterStatus === 'All' && (intern.status === 'Current Intern' || intern.status === 'Internship Complete')) ||
      (filterStatus !== 'All' && intern.status === filterStatus);

    const matchesName = intern.studentName.toLowerCase().includes(nameSearch.toLowerCase());
    const matchesJob = intern.internshipTitle.toLowerCase().includes(jobSearch.toLowerCase());

    return matchesStatus && matchesName && matchesJob;
  });

  const indexOfLastIntern = currentPage * internsPerPage;
  const indexOfFirstIntern = indexOfLastIntern - internsPerPage;
  const currentInterns = filteredInterns.slice(indexOfFirstIntern, indexOfLastIntern);
  const totalPages = Math.ceil(filteredInterns.length / internsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95"></div>
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Manage Interns</h1>
          <p className="text-lg text-blue-100 mb-6">Filter, view, and manage internship participants</p>

          <div className="flex flex-wrap justify-center gap-4">
            <input
              type="text"
              placeholder="Search by name"
              value={nameSearch}
              onChange={(e) => {
                setNameSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-w-[200px]"
            />

            <input
              type="text"
              placeholder="Search by internship title"
              value={jobSearch}
              onChange={(e) => {
                setJobSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-w-[200px]"
            />

            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-w-[200px]"
            >
              <option value="All">All</option>
              <option value="Current Intern">Current Intern</option>
              <option value="Internship Complete">Internship Complete</option>
            </select>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8 -mt-10 relative z-20">
        {currentInterns.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-10">No interns found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {currentInterns.map((intern) => (
              <motion.div
                key={intern.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition"
                onClick={() => navigate(`/interns/${intern.id}`)}
              >
                {intern.image && (
                  <img
                    src={intern.image}
                    alt={intern.studentName}
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover shadow-sm"
                  />
                )}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-[#00106A]">{intern.studentName}</h3>
                  <p className="text-sm text-gray-600">{intern.internshipTitle}</p>
                  <span className={`inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full ${statusColors[intern.status]}`}>
                    {intern.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
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

export default InternList;
