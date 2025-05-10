import React, { useState } from 'react';
import { FaSearch, FaIndustry, FaCalendarAlt, FaDollarSign, FaBuilding, FaTools, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const internshipsMock = [
  {
    id: 1,
    company: 'Google',
    title: 'Software Engineering Intern',
    industry: 'Tech',
    duration: '3 months',
    paid: true,
    salary: '$3000/month',
    skills: 'JavaScript, React, Node.js',
    description: 'Develop and maintain software applications, work with the engineering team to improve the product.'
  },
  {
    id: 2,
    company: 'UNICEF',
    title: 'Data Analyst Intern',
    industry: 'NGO',
    duration: '6 months',
    paid: false,
    salary: null,
    skills: 'Excel, Python, Data Visualization',
    description: 'Analyze data and create reports to support UNICEFs efforts in various global initiatives.'
  },
  {
    id: 3,
    company: 'BMW',
    title: 'Mechanical Engineering Intern',
    industry: 'Automotive',
    duration: '3 months',
    paid: true,
    salary: '$3500/month',
    skills: 'SolidWorks, AutoCAD, Mechanical Design',
    description: 'Work on engineering projects and assist with design tasks and simulations in the automotive industry.'
  },
];

const ViewAllInternships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [paidFilter, setPaidFilter] = useState('');
  const [selectedInternship, setSelectedInternship] = useState(null);

  const filteredInternships = internshipsMock.filter((internship) => {
    return (
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (industryFilter === '' || internship.industry === industryFilter) &&
      (durationFilter === '' || internship.duration === durationFilter) &&
      (paidFilter === '' || 
        (paidFilter === 'paid' && internship.paid) || 
        (paidFilter === 'unpaid' && !internship.paid))
    );
  });
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Premium Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-[#00106A] to-[#0038A0] py-16 shadow-md"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-3"
          >
            Internship Opportunities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-blue-100"
          >
            Discover and manage available internships
          </motion.p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaIndustry className="text-gray-400" />
            </div>
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              <option value="">All Industries</option>
              <option value="Tech">Tech</option>
              <option value="NGO">NGO</option>
              <option value="Automotive">Automotive</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-gray-400" />
            </div>
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
            >
              <option value="">All Durations</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaDollarSign className="text-gray-400" />
            </div>
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={paidFilter}
              onChange={(e) => setPaidFilter(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </motion.div>

        {/* Internship Cards */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredInternships.map((internship) => (
            <motion.div
              key={internship.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedInternship(internship)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 h-full flex flex-col border border-gray-100 hover:ring-2 hover:ring-opacity-30 hover:ring-[#00D6A0]"
            >
              <div className="h-2 w-full bg-gradient-to-r from-blue-600 to-blue-800"></div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{internship.title}</h3>
                <p className="text-lg text-gray-600 mb-3">{internship.company}</p>
                <p className="text-sm text-gray-500 mb-4">{internship.industry} • {internship.duration}</p>
                
                <div className="mt-auto">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    internship.paid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {internship.paid ? 'Paid' : 'Unpaid'} {internship.paid && `• ${internship.salary}`}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredInternships.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="mx-auto max-w-md">
              <FaSearch className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No internships found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>

      {/* Internship Detail Modal */}
      <AnimatePresence>
        {selectedInternship && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedInternship(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
            >
              <div className="h-2 w-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-xl"></div>
              <div className="p-6">
                <button
                  onClick={() => setSelectedInternship(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="text-2xl" />
                </button>

                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                    <FaBuilding size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedInternship.title}</h2>
                    <p className="text-lg text-gray-600">{selectedInternship.company}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <FaIndustry className="text-gray-500 mr-3" />
                    <span>{selectedInternship.industry}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-500 mr-3" />
                    <span>{selectedInternship.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <FaDollarSign className="text-gray-500 mr-3" />
                    <span className={selectedInternship.paid ? 'text-green-600' : 'text-yellow-600'}>
                      {selectedInternship.paid ? 'Paid' : 'Unpaid'} {selectedInternship.paid && `• ${selectedInternship.salary}`}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">Skills Required</h3>
                  <p className="text-gray-600">{selectedInternship.skills}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">Description</h3>
                  <p className="text-gray-600">{selectedInternship.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewAllInternships;