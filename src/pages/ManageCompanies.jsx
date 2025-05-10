import React, { useState } from 'react';
import { FaBuilding, FaIndustry, FaUsers, FaMapMarkerAlt, FaEnvelope, FaPhone, FaGlobe, FaLinkedin, FaLaptopCode, FaLeaf, FaHeartbeat, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const sampleCompanies = [
  {
    id: 1,
    name: 'TechNova',
    industry: 'IT',
    size: '150 employees',
    headquarters: 'San Francisco, CA',
    description: 'TechNova is an AI startup revolutionizing personal assistants through advanced neural networks and language models.',
    email: 'contact@technova.com',
    phone: '+1 415 123 4567',
    website: 'https://technova.com',
    linkedin: 'https://linkedin.com/company/technova',
    logo: 'https://via.placeholder.com/80?text=TN',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'EcoLogix',
    industry: 'Environment',
    size: '75 employees',
    headquarters: 'Berlin, Germany',
    description: 'EcoLogix leads sustainable innovations in energy and recycling, focused on preserving the planet.',
    email: 'info@ecologix.org',
    phone: '+49 30 9876 5432',
    website: 'https://ecologix.org',
    linkedin: 'https://linkedin.com/company/ecologix',
    logo: 'https://via.placeholder.com/80?text=EL',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'MediSphere',
    industry: 'Healthcare',
    size: '200 employees',
    headquarters: 'London, UK',
    description: 'MediSphere creates cutting-edge health diagnostics using wearable devices and analytics.',
    email: 'support@medisphere.com',
    phone: '+44 20 7946 0958',
    website: 'https://medisphere.com',
    linkedin: 'https://linkedin.com/company/medisphere',
    logo: 'https://via.placeholder.com/80?text=MS',
    status: 'Pending',
  },
];

const industryIcons = {
  IT: <FaLaptopCode size={40} className="text-blue-600" />,
  Environment: <FaLeaf size={40} className="text-[#00D6A0]" />,
  Healthcare: <FaHeartbeat size={40} className="text-red-500" />,
};

const ManageCompanies = () => {
  const [companies, setCompanies] = useState(sampleCompanies);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleDecision = (id, status) => {
    setCompanies(prev =>
      prev.map(company =>
        company.id === id ? { ...company, status } : company
      )
    );
    setSelectedCompany(null);
  };

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? c.industry === filter : true)
  );

  const detailsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Premium Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95"></div>
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Manage Company Applications
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-blue-100 max-w-2xl mx-auto mb-8"
            >
              Review, approve, and manage company registration requests with our comprehensive dashboard
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-md relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-blue-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 -mt-10 relative z-20">
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <label htmlFor="industry-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Industry</label>
              <select
                id="industry-filter"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Industries</option>
                <option value="IT">IT</option>
                <option value="Environment">Environment</option>
                <option value="Healthcare">Healthcare</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <div className="text-sm text-gray-500 mb-1">Showing {filteredCompanies.length} companies</div>
              <div className="h-1 bg-gradient-to-r from-blue-500 to-[#00D6A0] rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Company Cards */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCompanies.map(company => (
            <motion.div
              key={company.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              onClick={() => setSelectedCompany(company)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 h-full flex flex-col border border-gray-100 hover:ring-2 hover:ring-opacity-30 hover:ring-[#00D6A0]"
            >
              <div className="h-2 w-full bg-gradient-to-r from-blue-600 to-blue-800"></div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center mb-4">
                  {industryIcons[company.industry] || <FaBuilding size={40} className="text-gray-500" />}
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-800">{company.name}</h2>
                    <p className="text-sm text-gray-600">{company.industry}</p>
                  </div>
                </div>

                <p className="mb-4 text-gray-600">{company.description}</p>

                <div className="mt-auto flex justify-between items-center">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    company.status === 'Accepted' ? 'bg-green-100 text-green-800' : 
                    company.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {company.status}
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="text-[#00D6A0] font-medium flex items-center"
                  >
                    Details
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
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <div className="mx-auto max-w-md">
              <FaSearch className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No companies found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Company Details Modal */}
      <AnimatePresence>
        {selectedCompany && (
          <motion.div
            key="details"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={detailsVariants}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedCompany(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-2 w-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-xl"></div>
              <div className="p-6">
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-center mb-6">
                  {industryIcons[selectedCompany.industry] || <FaBuilding size={48} className="text-gray-500" />}
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-gray-800">{selectedCompany.name}</h2>
                    <p className="text-gray-600">{selectedCompany.industry} • {selectedCompany.size}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-gray-500 mr-3" />
                    <span>{selectedCompany.headquarters}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-gray-500 mr-3" />
                    <a href={`mailto:${selectedCompany.email}`} className="text-blue-600 hover:underline">
                      {selectedCompany.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-gray-500 mr-3" />
                    <span>{selectedCompany.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <FaGlobe className="text-gray-500 mr-3" />
                    <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {selectedCompany.website}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <FaLinkedin className="text-gray-500 mr-3" />
                    <a href={selectedCompany.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      LinkedIn Profile
                    </a>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">About the Company</h3>
                  <p className="text-gray-600 mb-4">{selectedCompany.description}</p>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus laoreet ipsum eu purus facilisis, 
                    sed iaculis dolor ullamcorper. Pellentesque ac mi vehicula, feugiat metus non, tincidunt nunc.
                  </p>
                </div>

                <div className="flex justify-end space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDecision(selectedCompany.id, 'Rejected')}
                    className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Reject
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDecision(selectedCompany.id, 'Accepted')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Approve
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageCompanies;