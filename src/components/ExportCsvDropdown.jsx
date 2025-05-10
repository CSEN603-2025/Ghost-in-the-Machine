// src/components/ExportCsvDropdown.jsx
import React, { useState } from 'react';

export default function ExportCsvDropdown({ kpis, cycle, major }) {
  const [open, setOpen] = useState(false);

  const downloadCsv = (scope) => {
    // Build CSV rows
    const rows = [
      ['Metric', 'Value'],
      ['Accepted Reports', kpis.accepted],
      ['Rejected Reports', kpis.rejected],
      ['Flagged Reports', kpis.flagged],
      ['Avg Review Time', kpis.avgReviewTime],
      ['Top Courses', kpis.topCourses.join('; ')],
      ['Top Companies', kpis.topCompanies.join('; ')],
      ...kpis.companyInternCount.map(c => [c.name, c.count]),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `kpis_${scope || 'all'}_${cycle.start}_${cycle.end}_${major || 'all'}.csv`;
    link.click();
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="bg-white text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-50 transition"
      >
        Export CSV
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
          <button
            onClick={() => downloadCsv('all')}
            className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            style={{ color: 'black', textDecoration: 'none' }}
          >
            All KPIs
          </button>
          <button
            onClick={() => downloadCsv('filtered')}
            className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            style={{ color: 'black', textDecoration: 'none' }}
          >
            Current Filters
          </button>
        </div>
      )}
    </div>
  );
}
