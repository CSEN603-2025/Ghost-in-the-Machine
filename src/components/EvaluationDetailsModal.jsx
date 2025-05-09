import React from 'react';

export default function EvaluationDetailsModal({ evalReport, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
        <h2 className="text-2xl font-bold text-[#00106A] mb-4">
          {evalReport.title}
        </h2>
        <p className="text-gray-700 mb-2">
          <strong>Student:</strong> {evalReport.studentName}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Company:</strong> {evalReport.companyName}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Supervisor:</strong> {evalReport.supervisorName}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Start Date:</strong> {evalReport.startDate}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>End Date:</strong> {evalReport.endDate}
        </p>
        <p className="text-gray-700 mb-6">{evalReport.evaluationContent}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white rounded-lg shadow-md transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
