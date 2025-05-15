import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

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

  const filteredStudents = selectedStatus === 'All'
    ? dummyStudents
    : dummyStudents.filter(s => s.internshipStatus === selectedStatus);

  const handleCardClick = (studentId, studentImage) => {
    navigate(`/students/${studentId}`, {
      state: {
        animateFrom: 'card',
        cardImage: studentImage
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative bg-[#00106A] text-white py-16 px-6 text-center">
        
        <motion.button
  onClick={() => navigate('/scad-dashboard')}
  whileHover={{ x: -5 }}
  className="absolute top-6 left-6 z-30 flex items-center text-white hover:underline"
>
  <ArrowLeft className="mr-1 w-5 h-5" /> Back
</motion.button>


        <h1 className="text-4xl font-bold mb-3">Student Management</h1>
        <p className="text-xl text-blue-100">Track student internship progress</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-center flex-wrap gap-4 mb-10">
          {['All', 'In Progress', 'Completed', 'Not Started'].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full border shadow-sm font-medium ${
                selectedStatus === status
                  ? 'bg-[#00106A] text-white'
                  : 'bg-white text-[#00106A] hover:bg-gray-100'
              }`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredStudents.map((student) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg cursor-pointer"
              onClick={() => handleCardClick(student.id, student.image)}
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
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
