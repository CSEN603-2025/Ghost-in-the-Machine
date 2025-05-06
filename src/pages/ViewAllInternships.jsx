import React, { useState } from 'react';
import { FaSearch, FaIndustry, FaCalendarAlt, FaDollarSign, FaBuilding, FaTools, FaTimes } from 'react-icons/fa';

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
    description: 'Analyze data and create reports to support UNICEF’s efforts in various global initiatives.'
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
      (internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (industryFilter === '' || internship.industry === industryFilter) &&
      (durationFilter === '' || internship.duration === durationFilter) &&
      (paidFilter === '' || (paidFilter === 'paid' && internship.paid) || (paidFilter === 'unpaid' && !internship.paid))
    );
  });

  const closeModal = () => {
    setSelectedInternship(null); // Close the modal by setting the selected internship to null
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Hero Section */}
      <section className="bg-[#00106A] text-white py-12 px-8 flex items-center justify-center mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-3">Internship Management</h1>
          <p className="text-lg mb-4">Search and filter internship opportunities efficiently.</p>
        </div>
      </section>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search internships..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-3 right-3 text-gray-400" />
        </div>

        <div className="relative">
          <select
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            <option value="">All Industries</option>
            <option value="Tech">Tech</option>
            <option value="NGO">NGO</option>
            <option value="Automotive">Automotive</option>
          </select>
          <FaIndustry className="absolute top-3 right-3 text-gray-400" />
        </div>

        <div className="relative">
          <select
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
          >
            <option value="">All Durations</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
          </select>
          <FaCalendarAlt className="absolute top-3 right-3 text-gray-400" />
        </div>

        <div className="relative">
          <select
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
            value={paidFilter}
            onChange={(e) => setPaidFilter(e.target.value)}
          >
            <option value="">Paid & Unpaid</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <FaDollarSign className="absolute top-3 right-3 text-gray-400" />
        </div>
      </div>

      {/* Internship Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredInternships.map((internship) => (
          <div
            key={internship.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer border-l-4 border-blue-600"
            onClick={() => setSelectedInternship(internship)}
          >
            <h3 className="text-2xl font-semibold text-[#00106A]">{internship.title}</h3>
            <p className="text-lg text-gray-700">{internship.company}</p>
            <p className="text-sm text-gray-500">{internship.industry} • {internship.duration}</p>
            <span
              className={`inline-block mt-3 px-4 py-2 text-sm rounded-full ${internship.paid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
            >
              {internship.paid ? 'Paid' : 'Unpaid'}
            </span>
          </div>
        ))}
      </div>

      {/* Internship Detail Modal */}
      {selectedInternship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg shadow-2xl w-3/4 md:w-1/2 lg:w-2/3 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                {/* Company Logo */}
                <img
                  src={`/logos/${selectedInternship.company.toLowerCase()}-logo.png`} // Dynamically reference the logo
                  alt={selectedInternship.company}
                  className="h-16 w-16 mr-4 object-contain" // Adjust size as needed
                />
                <h2 className="text-3xl font-extrabold text-[#00106A]">{selectedInternship.title}</h2>
              </div>
              <FaTimes
                onClick={closeModal}
                className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
              />
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                <strong><FaBuilding className="inline mr-2" /> Company: </strong>{selectedInternship.company}
              </p>
              <p className="text-lg text-gray-700">
                <strong><FaIndustry className="inline mr-2" /> Industry: </strong>{selectedInternship.industry}
              </p>
              <p className="text-lg text-gray-700">
                <strong><FaCalendarAlt className="inline mr-2" /> Duration: </strong>{selectedInternship.duration}
              </p>
              <p className="text-lg text-gray-700">
                <strong><FaDollarSign className="inline mr-2" /> Paid: </strong>
                <span className={`${selectedInternship.paid ? 'text-green-600' : 'text-yellow-600'} font-semibold`}>
                  {selectedInternship.paid ? 'Yes' : 'No'} {selectedInternship.paid && `- ${selectedInternship.salary}`}
                </span>
              </p>
              <p className="text-lg text-gray-700">
                <strong><FaTools className="inline mr-2" /> Skills Required: </strong>{selectedInternship.skills}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Job Description: </strong>{selectedInternship.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllInternships;
