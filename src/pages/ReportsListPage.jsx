import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import ReportCard from '../components/ReportCard';
import ReportDetailsModal from '../components/ReportDetailsModal';

export default function ReportsListPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);

  // Load data
  useEffect(() => {
    const mock = [
      {
        id: 1,
        studentName: 'John Doe',
        companyName: 'TechCorp',
        major: 'Computer Science',
        status: 'Pending',
        title: 'Internship Report 1',
        reportContent: 'Detailed report content...',
      },
      {
        id: 2,
        studentName: 'Jane Smith',
        companyName: 'DesignCo',
        major: 'Graphic Design',
        status: 'Accepted',
        title: 'Internship Report 2',
        reportContent: 'Another report content...',
      },
      // …
    ];
    setReports(mock);
    setFiltered(mock);
  }, []);

  // Filter handler
  const handleFilter = ({ major, status }) => {
    setFiltered(
      reports.filter(r =>
        (major ? r.major === major : true) &&
        (status ? r.status === status : true)
      )
    );
  };

  // Update status in both reports + filtered
  const handleStatusChange = (id, newStatus) => {
    setReports(rs =>
      rs.map(r => (r.id === id ? { ...r, status: newStatus } : r))
    );
    setFiltered(fs =>
      fs.map(r => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const goHome = () => navigate('/');
  const logout = () => navigate('/welcome');

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      {/* Top Navbar */}
      <div className="w-full bg-[#00106A] py-6 px-6 flex items-center justify-between">
        <button
          onClick={goHome}
          className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] hover:from-[#00D6A0] hover:to-[#00F0B5] text-black font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
        >
          Home
        </button>
        <h1 className="text-3xl font-bold text-white">Internship Reports</h1>
        <button
          onClick={logout}
          className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* Filter */}
      <div className="px-6 py-4 bg-[#ffffff] border-b border-gray-200">
        <Filter onFilter={handleFilter} />
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-12 pt-10">
        {filtered.map(report => (
          <ReportCard
            key={report.id}
            report={report}
            onSelect={setSelected}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="px-6 pb-12">
        <Pagination />
      </div>

      {/* Details Modal */}
      {selected && (
        <ReportDetailsModal
          report={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
