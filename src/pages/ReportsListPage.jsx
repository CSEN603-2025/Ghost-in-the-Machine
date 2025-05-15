// src/pages/ReportsListPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFileAlt, FaSearch } from 'react-icons/fa';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import ReportDetailsModal from '../components/ReportDetailsModal';
import { ArrowLeft } from 'lucide-react';

export default function ReportsListPage() {
  const navigate = useNavigate();

  // Full list + filtered view
  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterData, setFilterData] = useState({ major: '', status: '' });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Modal
  const [selectedReport, setSelectedReport] = useState(null);

  // Load mock data
  useEffect(() => {
    const mock = [
      {
        id: 1,
        studentName: 'John Doe',
        major: 'Computer Science',
        semester: 'Fall 2024',
        submissionDate: '2025-03-15',
        status: 'Pending',
        title: 'Internship Report 1',
        reportContent: 'Introduction...\nBody...\nCourses used: CS101, CS102',
        companyName: 'TechCorp',
      },
      {
        id: 2,
        studentName: 'Jane Smith',
        major: 'Graphic Design',
        semester: 'Spring 2025',
        submissionDate: '2025-03-20',
        status: 'Accepted',
        title: 'Internship Report 2',
        reportContent: 'Intro...\nBody...\nCourses used: GD201, GD202',
        companyName: 'DesignCo',
      },
      // …add more as needed
    ];
    setReports(mock);
    setFiltered(mock);
  }, []);

  // Re-filter whenever searchTerm, filterData, or reports change
  useEffect(() => {
    let temp = reports;
    if (filterData.major) {
      temp = temp.filter(r => r.major === filterData.major);
    }
    if (filterData.status) {
      temp = temp.filter(r => r.status === filterData.status);
    }
    if (searchTerm) {
      const key = searchTerm.toLowerCase();
      temp = temp.filter(r =>
        r.studentName.toLowerCase().includes(key) ||
        r.title.toLowerCase().includes(key)
      );
    }
    setFiltered(temp);
  }, [searchTerm, filterData, reports]);

  const handleFilter = (data) => {
    setFilterData(data);
    setCurrentPage(1);
  };

  // Download PDF helper
  const downloadPdf = (id) => {
    const link = document.createElement('a');
    link.href = `/api/reports/${id}/download`;
    link.download = `report-${id}.pdf`;
    link.click();
  };

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
       <motion.button
  whileHover={{ x: -5 }}
  onClick={() => navigate('/faculty-dashboard')}
  className="absolute top-6 left-6 z-30 flex items-center text-white hover:underline"
>
  <ArrowLeft className="mr-1 w-5 h-5" /> Back
</motion.button>

        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95" />
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center text-white">
          <FaFileAlt size={48} className="mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Internship Reports</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Browse and manage student internship reports.
          </p>
          <div className="w-full max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-blue-300" />
            </div>
            <input
              type="text"
              placeholder="Search by student name or report title"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Toolbar Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-20 max-w-7xl mx-auto px-6 py-6 -mt-12 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-wrap items-center gap-4"
      >
        <Filter onFilter={handleFilter} />
      </motion.div>

      {/* Reports Table Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#00106A]/90 text-white">
              <tr>
                <th className="p-3 text-left">Student Name</th>
                <th className="p-3 text-left">Major</th>
                <th className="p-3 text-left">Semester</th>
                <th className="p-3 text-left">Submission Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(report => (
                <tr
                  key={report.id}
                  className="border-b last:border-none hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">{report.studentName}</td>
                  <td className="p-3">{report.major}</td>
                  <td className="p-3">{report.semester}</td>
                  <td className="p-3">{report.submissionDate}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        report.status === 'Accepted'
                          ? 'bg-green-100 text-green-800'
                          : report.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="p-3 flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="px-3 py-1 bg-[#274472] text-white rounded hover:bg-[#41729F] transition text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => downloadPdf(report.id)}
                      className="text-gray-500 hover:text-[#00106A] transition p-1 rounded hover:bg-gray-200"
                      title="Download Report"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-3 text-center text-gray-500">
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 0 && (
            <div className="px-3 py-4 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedReport && (
        <ReportDetailsModal
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          report={selectedReport}
          onStatusChange={(id, newStatus) => {
            setReports(rs =>
              rs.map(r => (r.id === id ? { ...r, status: newStatus } : r))
            );
          }}
        />
      )}
    </div>
  );
}
