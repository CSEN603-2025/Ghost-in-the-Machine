import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaTwitter, FaInstagram, FaFacebook, FaGlobe } from 'react-icons/fa';
import { ArrowLeft } from 'lucide-react';

const dummyStudents = [
  {
    id: '1',
    name: 'Sara Ahmed',
    major: 'Computer Science',
    internshipStatus: 'In Progress',
    email: 'sara.ahmed@example.com',
    phone: '+201234567890',
    year: '3rd Year',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    socials: {
      website: 'https://example.com',
      github: 'saraGithub',
      twitter: 'saraTweets',
      instagram: 'saraInsta',
      facebook: 'saraFB',
    },
    internshipMonths: 1,
  },
  {
    id: '2',
    name: 'Omar Khaled',
    major: 'Electrical Engineering',
    internshipStatus: 'Completed',
    email: 'omar.khaled@example.com',
    phone: '+201234567891',
    year: '4th Year',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    socials: {
      website: 'https://example.com',
      github: 'omarGithub',
      twitter: 'omarTweets',
      instagram: 'omarInsta',
      facebook: 'omarFB',
    },
    internshipMonths: 3,
  },
  {
    id: '3',
    name: 'Layla Hassan',
    major: 'Mechanical Engineering',
    internshipStatus: 'Not Started',
    email: 'layla.hassan@example.com',
    phone: '+201234567892',
    year: '2nd Year',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    socials: {
      website: 'https://example.com',
      github: 'laylaGithub',
      twitter: 'laylaTweets',
      instagram: 'laylaInsta',
      facebook: 'laylaFB',
    },
    internshipMonths: 0,
  },
];

const statusColor = {
  Completed: 'bg-green-100 text-green-700',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  'Not Started': 'bg-red-100 text-red-700',
};

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = dummyStudents.find((s) => s.id === id);

  if (!student) {
    return <div className="p-6 text-red-600">Student not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] p-6">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            whileHover={{ x: -5 }}
            onClick={() => navigate(-1)}
            className="flex items-center text-[#00106A] hover:underline mb-4"
          >
            <ArrowLeft className="mr-1 w-4 h-4" /> Back to Students
          </motion.button>

          <motion.div 
            className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Left Side - Original Profile Card Design */}
            <div className="md:w-1/3 text-center">
              <motion.img
                src={student.image}
                alt={student.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                layoutId={`student-image-${id}`}
                transition={{ duration: 0.3 }}
              />
              <h2 className="text-xl font-bold text-[#00106A]">{student.name}</h2>
              <p className="text-gray-600">{student.major}</p>
              <p className="text-sm text-gray-500 mb-4">{student.year}</p>

              {/* Social Icons */}
              <div className="flex justify-center space-x-4 mb-6 text-xl">
                <a href={student.socials.website} target="_blank" rel="noopener noreferrer" className="text-[#00106A] hover:text-blue-600">
                  <FaGlobe />
                </a>
                {/* ... other social icons */}
              </div>

              {/* Contact Info - Original Typography */}
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Phone:</strong> {student.phone}</p>
                <p>
                  <strong>Internship:</strong>{' '}
                  <span className={`px-2 py-1 rounded text-sm font-medium ${statusColor[student.internshipStatus]}`}>
                    {student.internshipStatus}
                  </span>
                </p>
                <p>
                  <strong>CV:</strong>{' '}
                  <a href="/dummy-cv.pdf" target="_blank" className="text-blue-600 hover:underline">View</a>{' '}
                  |{' '}
                  <a href="/dummy-cv.pdf" download className="text-blue-600 hover:underline">Download</a>
                </p>
              </div>
            </div>

            {/* Right Side - Original Content */}
            <div className="flex-1 space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-[#00106A] mb-2">Internship Duration</h3>
                <div className="flex space-x-3">
                  {[1, 2, 3].map((month) => (
                    <div key={month} className="flex-1 h-4 rounded-full border border-gray-300">
                      <div className={`h-full rounded-full ${
                        student.internshipMonths >= month ? 'bg-[#00106A]' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">Each bar represents a completed month</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-[#00106A] mb-2">Interests & Projects</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Machine Learning</li>
                  <li>Open Source Contributions</li>
                  <li>Robotics Club Participation</li>
                  <li>Capstone Project: Smart Traffic System</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StudentProfile;