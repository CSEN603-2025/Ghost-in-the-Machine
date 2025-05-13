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
  // …more
];

export default function StudentWorkshopsPage() {
  const [workshops] = useState(mockWorkshops);
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-[#00D6A0] to-[#2b7de9] text-white py-16 mb-10"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            📅 Upcoming Workshops
          </motion.h1>
          <motion.p 
            className="text-xl max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Browse, register, and join live or watch recordings at your convenience.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Workshop Cards */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map(ws => (
          <motion.div
            key={ws.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
            className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition"
            onClick={() => setSelected(ws)}
          >
            <div className="h-1 w-full bg-gradient-to-r from-[#00D6A0] to-[#2b7de9]" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{ws.name}</h3>
              <p className="text-gray-600 mb-1"><strong>Speaker:</strong> {ws.speaker}</p>
              <p className="text-gray-600 text-sm">
                <strong>When:</strong> {new Date(ws.start).toLocaleString()} – {new Date(ws.end).toLocaleTimeString()}
              </p>
              <button className="mt-4 w-full py-2 bg-gradient-to-r from-[#00D6A0] to-[#2b7de9] text-white rounded-full font-semibold shadow hover:shadow-lg transition-all">
                View Details →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Details Modal */}
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
