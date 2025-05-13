import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserGraduate, FaSearch, FaTimes } from 'react-icons/fa';

const dummyStudents = [
  { id: 1, name: 'Sara Ahmed', major: 'Computer Science', internshipStatus: 'In Progress', email: 'sara.ahmed@example.com', phone: '+201234567890', year: '3rd Year', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 2, name: 'Omar Khaled', major: 'Electrical Engineering', internshipStatus: 'Completed', email: 'omar.khaled@example.com', phone: '+201234567891', year: '4th Year', image: 'https://randomuser.me/api/portraits/men/22.jpg' },
  { id: 3, name: 'Layla Hassan', major: 'Mechanical Engineering', internshipStatus: 'Not Started', email: 'layla.hassan@example.com', phone: '+201234567892', year: '2nd Year', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
];

const statusColors = {
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Completed: 'bg-green-100 text-green-800',
  'Not Started': 'bg-gray-100 text-gray-800',
};

const detailsVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: 30 },
};

export default function ManageStudents() {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  const filtered = dummyStudents
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
    .filter(s => selectedStatus === 'All' ? true : s.internshipStatus === selectedStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95" />
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center text-white">
          <FaUserGraduate size={48} className="mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Manage Students</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Track student internship progress and details
          </p>
          <div className="w-full max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-blue-300" />
            </div>
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8 -mt-10 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100 flex flex-wrap gap-4 justify-center"
        >
          {['All', 'In Progress', 'Completed', 'Not Started'].map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-5 py-2 rounded-full border font-medium transition ${
                selectedStatus === status
                  ? 'bg-[#00106A] text-white'
                  : 'bg-white text-[#00106A] hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </motion.div>

        {/* Student Cards */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filtered.map(student => (
            <motion.div
              key={student.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedStudent(student)}
            >
              <motion.img
                src={student.image}
                alt={student.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-sm"
                layoutId={`student-image-${student.id}`}
              />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-[#00106A]">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.major}</p>
                <span className={`inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full ${statusColors[student.internshipStatus]}`}>
                  {student.internshipStatus}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={detailsVariants}
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
              <motion.img
                src={selectedStudent.image}
                alt={selectedStudent.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-sm"
                layoutId={`student-image-${selectedStudent.id}`}
              />
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">{selectedStudent.name}</h2>
              <p className="text-gray-600 text-center mb-4">
                {selectedStudent.major} • {selectedStudent.year}
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> {selectedStudent.email}</p>
                <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                <p><strong>Status:</strong> {selectedStudent.internshipStatus}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
