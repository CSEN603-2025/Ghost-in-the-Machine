import React from 'react';
import { FaDownload, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function EvaluationDetailsModal({ evalReport, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 relative overflow-hidden"
      >
        <div className="h-2 w-full bg-gradient-to-r from-blue-600 to-blue-800" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">{evalReport.title}</h2>
            <FaDownload size={20} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
          </div>
          <p className="text-gray-700">
            <strong>Student:</strong> {evalReport.studentName}
          </p>
          <p className="text-gray-700">
            <strong>Company:</strong> {evalReport.companyName}
          </p>
          <p className="text-gray-700">
            <strong>Supervisor:</strong> {evalReport.supervisorName}
          </p>
          <p className="text-gray-700">
            <strong>Dates:</strong> {evalReport.startDate} – {evalReport.endDate}
          </p>
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Evaluation</h3>
            <p className="text-gray-600">{evalReport.evaluationContent}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
