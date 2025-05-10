import React, { useState } from 'react';

export default function GeneratePdfModal({ isOpen, onClose, kpis, cycle, major }) {
  const [sections, setSections] = useState({
    accepted: true,
    rejected: true,
    flagged: true,
    avgReviewTime: true,
    topCourses: true,
    topCompanies: true,
    companyInternCount: true,
  });

  if (!isOpen) return null;

  const toggle = (key) => setSections(s => ({ ...s, [key]: !s[key] }));

  const downloadPdf = () => {
    // placeholder: generate PDF server-side or via jsPDF
    alert(`Generating PDF with sections: ${Object.keys(sections).filter(k => sections[k]).join(', ')}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Select Sections to Include</h2>
        <div className="space-y-2">
          {Object.entries(sections).map(([key, val]) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={val}
                onChange={() => toggle(key)}
                className="mr-2"
              />
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={downloadPdf} className="px-4 py-2 bg-[#00106A] text-white rounded">
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
