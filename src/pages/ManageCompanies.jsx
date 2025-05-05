import React, { useState } from 'react';
import { FaBuilding, FaIndustry, FaUsers, FaMapMarkerAlt, FaEnvelope, FaPhone, FaGlobe, FaLinkedin, FaLaptopCode, FaLeaf, FaHeartbeat } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Sample company data
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

// Icons for each industry
const industryIcons = {
  IT: <FaLaptopCode size={40} className="text-blue-500" />,
  Environment: <FaLeaf size={40} className="text-green-500" />,
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
    setSelectedCompany(null); // Close modal after decision
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
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-6 text-center shadow-md">
        <h1 className="text-4xl font-bold mb-2">Manage Company Requests</h1>
        <p className="text-lg">Review and manage company sign-up requests with ease</p>
      </div>

      {/* Filters */}
      <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white shadow">
        <input
          type="text"
          placeholder="Search companies..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-400"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-4 py-2 border rounded shadow-sm focus:outline-none"
        >
          <option value="">All Industries</option>
          <option value="IT">IT</option>
          <option value="Environment">Environment</option>
          <option value="Healthcare">Healthcare</option>
        </select>
      </div>

      {/* Company Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {filteredCompanies.map(company => (
          <div
            key={company.id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition cursor-pointer"
            onClick={() => setSelectedCompany(company)}
          >
            <div className="flex items-center mb-4">
              {industryIcons[company.industry] || <FaBuilding size={40} className="text-gray-500" />}
              <div className="ml-4">
                <h2 className="text-xl font-bold">{company.name}</h2>
                <p className="text-sm text-gray-600">{company.industry}</p>
              </div>
            </div>

            <p className="mb-4 text-sm text-gray-700 text-center">{company.description}</p>

            <div className="flex justify-between items-center mt-4">
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${company.status === 'Accepted' ? 'bg-green-100 text-green-700' : company.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {company.status}
              </div>
              <span className="text-sm text-blue-600 underline hover:cursor-pointer">View Details</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal with animation */}
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
              className="bg-white rounded-xl p-6 max-w-lg w-full shadow-xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCompany(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
              >
                ×
              </button>
              <div className="flex items-center mb-4">
                {industryIcons[selectedCompany.industry] || <FaBuilding size={40} className="text-gray-500" />}
                <div className="ml-4">
                  <h2 className="text-2xl font-bold">{selectedCompany.name}</h2>
                  <p className="text-sm text-gray-600">{selectedCompany.industry}</p>
                </div>
              </div>
              <p className="mb-2"><FaUsers className="inline mr-2" /> {selectedCompany.size}</p>
              <p className="mb-2"><FaMapMarkerAlt className="inline mr-2" /> {selectedCompany.headquarters}</p>
              <p className="mb-2"><FaEnvelope className="inline mr-2" /> {selectedCompany.email}</p>
              <p className="mb-2"><FaPhone className="inline mr-2" /> {selectedCompany.phone}</p>
              <p className="mb-2"><FaGlobe className="inline mr-2" /> <a href={selectedCompany.website} className="text-blue-600 hover:underline">{selectedCompany.website}</a></p>
              <p className="mb-4"><FaLinkedin className="inline mr-2" /> <a href={selectedCompany.linkedin} className="text-blue-600 hover:underline">LinkedIn</a></p>
              <p className="mb-4">{selectedCompany.description}</p>
              <h3 className="font-semibold mb-2">About Us</h3>
              <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus laoreet ipsum eu purus facilisis, sed iaculis dolor ullamcorper. Pellentesque ac mi vehicula, feugiat metus non, tincidunt nunc. Cras ultricies orci at nunc cursus tincidunt.</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleDecision(selectedCompany.id, 'Accepted')}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecision(selectedCompany.id, 'Rejected')}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
                >
                  Reject
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageCompanies;
