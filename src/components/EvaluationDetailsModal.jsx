import React from 'react';

const EvaluationDetailsModal = ({ isOpen, onClose, evaluation }) => {
  if (!isOpen) return null;

  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = `/api/evaluations/${evaluation.id}/download`;
    link.download = `evaluation-${evaluation.id}.pdf`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Evaluation Details</h2>
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

        {/* Details */}
        <div>
          <p><strong>Student Name:</strong> {evaluation.studentName}</p>
          <p><strong>Company:</strong> {evaluation.companyName}</p>
          <p><strong>Supervisor:</strong> {evaluation.supervisor}</p>
          <p><strong>Dates:</strong> {evaluation.internshipDates}</p>
          <p className="mt-4 text-gray-700 whitespace-pre-line">{evaluation.evaluationContent}</p>
        </div>
      </div>
    </div>
  );
};

export default EvaluationDetailsModal;
