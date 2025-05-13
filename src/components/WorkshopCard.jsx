import React from 'react';
import { motion } from 'framer-motion';

export default function WorkshopCard({ workshop, onViewDetails }) {
  return (
    <motion.div
      className="workshop-card bg-white rounded-lg p-4 shadow hover:shadow-lg"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="text-xl font-semibold">{workshop.name}</h3>
      <p className="text-gray-600"><strong>Speaker:</strong> {workshop.speaker}</p>
      <p className="text-gray-600"><strong>Date:</strong> {workshop.date}</p>
      <p className="text-gray-500">{workshop.description}</p>
      <button
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        onClick={onViewDetails}
      >
        View Details
      </button>
    </motion.div>
  );
}
