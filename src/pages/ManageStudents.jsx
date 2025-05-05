import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const dummyStudents = [
  {
    id: 1,
    name: 'Sara Ahmed',
    major: 'Computer Science',
    internshipStatus: 'In Progress',
    email: 'sara.ahmed@example.com',
    phone: '+201234567890',
    year: '3rd Year',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Omar Khaled',
    major: 'Electrical Engineering',
    internshipStatus: 'Completed',
    email: 'omar.khaled@example.com',
    phone: '+201234567891',
    year: '4th Year',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    id: 3,
    name: 'Layla Hassan',
    major: 'Mechanical Engineering',
    internshipStatus: 'Not Started',
    email: 'layla.hassan@example.com',
    phone: '+201234567892',
    year: '2nd Year',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

const statusColors = {
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Completed: 'bg-green-100 text-green-800',
  'Not Started': 'bg-gray-100 text-gray-800',
};

const ManageStudents = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const navigate = useNavigate();

  const filteredStudents =
    selectedStatus === 'All'
      ? dummyStudents
      : dummyStudents.filter((s) => s.internshipStatus === selectedStatus);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Hero Section */}
      <div className="bg-[#00106A] text-white py-12 px-6 md:px-20 text-center">
        <h1 className="text-4xl font-bold mb-2">Student Internship Management</h1>
        <p className="text-lg text-blue-100">Track and manage student internship progress with ease and clarity.</p>
      </div>

      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-[#00106A] mb-6 text-center">Manage Students</h2>

        {/* Filter */}
        <div className="flex justify-center flex-wrap gap-4 mb-10">
          {['All', 'In Progress', 'Completed', 'Not Started'].map((status) => (
            <button
              key={status}
              className={`px-5 py-2.5 rounded-full border shadow-sm transition-all duration-300 font-medium ${
                selectedStatus === status
                  ? 'bg-[#00106A] text-white'
                  : 'bg-white text-[#00106A] hover:bg-gray-100'
              }`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Student Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredStudents.map((student) => (
            <motion.div
              key={student.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              onClick={() => navigate(`/students/${student.id}`)}
            >
              <img
                src={student.image}
                alt={student.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-sm"
              />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-[#00106A]">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.major}</p>
                <p className="text-xs text-gray-500">{student.year}</p>
                <span
                  className={`inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full ${statusColors[student.internshipStatus]}`}
                >
                  {student.internshipStatus}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
