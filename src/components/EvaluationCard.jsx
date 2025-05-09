import React from 'react';

export default function EvaluationCard({ evalReport, onSelect }) {
  return (
    <div
      onClick={() => onSelect(evalReport)}
      className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
    >
      <h3 className="text-xl font-semibold text-[#00106A] mb-4">
        {evalReport.title}
      </h3>
      <p className="text-gray-600 mb-1">
        <strong>Student:</strong> {evalReport.studentName}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Company:</strong> {evalReport.companyName}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Supervisor:</strong> {evalReport.supervisorName}
      </p>
      <p className="text-gray-600">
        <strong>Dates:</strong> {evalReport.startDate} – {evalReport.endDate}
      </p>
    </div>
  );
}
