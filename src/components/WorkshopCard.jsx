import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function WorkshopCard({ workshop }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/workshop-details');
  };

  return (
    <motion.div
      className="workshop-card"
      whileHover={{ scale: 1.02, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.98 }}
    >
      <h3>{workshop.name}</h3>
      <p><strong>Speaker:</strong> {workshop.speaker}</p>
      <p><strong>Date:</strong> {workshop.date}</p>
      <p>{workshop.description}</p>
      <button className="view-details-btn" onClick={handleViewDetails}>
        View Details
      </button>
    </motion.div>
  );
}
