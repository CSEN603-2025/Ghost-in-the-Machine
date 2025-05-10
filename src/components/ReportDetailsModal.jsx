import React, { useState } from 'react';

const ReportDetailsModal = ({ isOpen, onClose, report, onStatusChange }) => {
  const [status, setStatus] = useState(report.status);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (window.confirm(`Change status to "${status}"?`)) {
      onStatusChange(report.id, status);
      onClose();
    }
  };

  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = `/api/reports/${report.id}/download`;
    link.download = `report-${report.id}.pdf`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-5xl w-full overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{report.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>

        {/* Download */}
        <div className="flex justify-end mb-4">
          <button
            onClick={downloadPdf}
            className="px-4 py-2 bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold rounded-lg shadow-md hover:from-[#00D6A0] hover:to-[#00F0B5] transition"
          >
            Download PDF
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Pane */}
          <div className="md:w-2/3 whitespace-pre-line text-gray-700">
            {report.reportContent}
          </div>

          {/* Right Pane */}
          <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Student Info</h3>
            <p><strong>Name:</strong> {report.studentName}</p>
            <p><strong>Major:</strong> {report.major}</p>
            <p><strong>Semester:</strong> {report.semester}</p>
            <p><strong>Company:</strong> {report.companyName}</p>
            <p><strong>Submitted:</strong> {report.submissionDate}</p>

            {/* Status */}
            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="border rounded-md p-2 w-full"
              >
                <option>Pending</option>
                <option>Flagged</option>
                <option>Rejected</option>
                <option>Accepted</option>
              </select>
              <button
                onClick={handleSave}
                className="mt-3 px-4 py-2 bg-[#00106A] text-white rounded-lg w-full"
              >
                Update Status
              </button>
            </div>

            {/* Clarifications */}
            {['Flagged', 'Rejected'].includes(status) && (
              <div className="mt-4">
                <label className="block text-gray-700 font-medium mb-2">Add Comment</label>
                <textarea
                  rows="3"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  className="w-full border rounded-md p-2"
                  placeholder="Write your clarification..."
                />
                <button
                  onClick={() => alert(`Clarification submitted:\n${comment}`)}
                  className="mt-2 px-4 py-2 bg-[#00106A] text-white rounded-lg w-full"
                >
                  Submit Clarification
                </button>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Past Comments</h3>
                  <div className="bg-gray-100 p-3 rounded-md mb-2">
                    SCAD: Please elaborate on your methodology.
                  </div>
                  <div className="bg-gray-100 p-3 rounded-md">
                    Faculty: Methodology clarified.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsModal;
