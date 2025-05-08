import React, { useState } from 'react';

export default function ReportDetailsModal({ report, onClose, onStatusChange }) {
  const [status, setStatus] = useState(report.status);

  const handleSave = () => {
    onStatusChange(report.id, status);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
        <h2 className="text-2xl font-bold text-[#00106A] mb-4">{report.title}</h2>
        <p className="text-gray-700 mb-2"><strong>Student:</strong> {report.studentName}</p>
        <p className="text-gray-700 mb-2"><strong>Company:</strong> {report.companyName}</p>
        <p className="text-gray-700 mb-2"><strong>Major:</strong> {report.major}</p>
        <p className="text-gray-700 mb-4"><strong>Content:</strong><br />{report.reportContent}</p>

        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Status</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#00106A] focus:ring focus:ring-[#00106A]/50"
          >
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Flagged">Flagged</option>
          </select>
        </label>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold rounded-lg shadow-md hover:from-[#00D6A0] hover:to-[#00F0B5] transition-all duration-300"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
