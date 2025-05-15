// src/pages/StudentWorkshopsPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WorkshopDetailsModal from '../components/WorkshopDetailsModal';

const mockWorkshops = [
  {
    id: 1,
    name: 'Career Prep 101',
    speaker: 'Alice Johnson',
    start: '2025-06-15T14:00',
    end:   '2025-06-15T15:30',
    description: 'Learn how to craft resumes & ace interviews.',
    videoUrl: 'https://www.youtube.com/embed/nIHyr_fp_yI',
    isLive: true
  },
  {
    id: 2,
    name: 'Advanced Networking',
    speaker: 'Bob Lee',
    start: '2025-07-01T10:00',
    end:   '2025-07-01T11:30',
    description: 'Building professional connections effectively.',
    videoUrl: 'https://www.youtube.com/embed/nIHyr_fp_yI',
    isLive: false
  },
  {
    id: 3,
    name: 'Personal Branding',
    speaker: 'Clara Chen',
    start: '2025-07-20T09:00',
    end:   '2025-07-20T10:30',
    description: 'Stand out online and off.',
    videoUrl: 'https://www.youtube.com/embed/nIHyr_fp_yI',
    isLive: false
  },
];

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function StudentWorkshopsPage() {
  const [workshops] = useState(mockWorkshops);
  const [selected, setSelected] = useState(null);

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
          <motion.h1
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            📅 Upcoming Workshops
          </motion.h1>
          <motion.p
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Browse, register, and join live or watch recordings at your convenience.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-6 py-8 -mt-10 relative z-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {workshops.map(ws => (
            <motion.div
              key={ws.id}
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden cursor-pointer transition-all"
              onClick={() => setSelected(ws)}
            >
              <div className="h-2 w-full bg-gradient-to-r from-blue-600 to-blue-800" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{ws.name}</h3>
                <p className="text-gray-600 mb-1"><strong>Speaker:</strong> {ws.speaker}</p>
                <p className="text-gray-600 text-sm">
                  <strong>When:</strong> {new Date(ws.start).toLocaleString()} –{' '}
                  {new Date(ws.end).toLocaleTimeString()}
                </p>
                <div className="mt-4 text-blue-600 font-medium flex items-center justify-end">
                  View Details →
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <WorkshopDetailsModal
            workshop={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
