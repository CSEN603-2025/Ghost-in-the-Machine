// src/pages/ReportsListPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFileAlt, FaSearch } from 'react-icons/fa';
import { ArrowLeft } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useToastNotifications } from '../hooks/useToastNotifications';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';

export default function ReportsListPage() {
  const navigate = useNavigate();
  const { success } = useToastNotifications();

  // Full list + filtered view
  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Search & filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterData, setFilterData] = useState({ major: '', status: '' });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Detail modal state
  const [selectedReport, setSelectedReport] = useState(null);
  const [clarification, setClarification] = useState('');

  // Load mock including flagged & rejected
  useEffect(() => {
    const mock = [
      {
        id: 1,
        studentName: 'John Doe',
        major: 'Computer Science',
        semester: 'Fall 2024',
        submissionDate: '2025-03-15',
        status: 'Flagged',
        title: 'Internship Report 1',
        reportContent: 'Detailed body of report 1 goes here...',
        companyName: 'TechCorp',
        clarification: ''
      },
      {
        id: 2,
        studentName: 'Jane Smith',
        major: 'Graphic Design',
        semester: 'Spring 2025',
        submissionDate: '2025-03-20',
        status: 'Rejected',
        title: 'Internship Report 2',
        reportContent: 'Detailed body of report 2 goes here...',
        companyName: 'DesignCo',
        clarification: ''
      },
      {
        id: 3,
        studentName: 'Ali Hassan',
        major: 'Business Administration',
        semester: 'Spring 2025',
        submissionDate: '2025-04-01',
        status: 'Accepted',
        title: 'Internship Report 3',
        reportContent: 'Detailed body of report 3 goes here...',
        companyName: 'BizPros',
        clarification: ''
      }
    ];
    setReports(mock);
    setFiltered(mock);
  }, []);

  // Re-filter when inputs change
  useEffect(() => {
    let temp = reports;
    if (filterData.major)    temp = temp.filter(r => r.major === filterData.major);
    if (filterData.status)   temp = temp.filter(r => r.status === filterData.status);
    if (searchTerm) {
      const key = searchTerm.toLowerCase();
      temp = temp.filter(r =>
        r.studentName.toLowerCase().includes(key) ||
        r.title.toLowerCase().includes(key)
      );
    }
    setFiltered(temp);
  }, [searchTerm, filterData, reports]);

  const handleFilter = data => {
    setFilterData(data);
    setCurrentPage(1);
  };

  // Generate a PDF for a given report
  const downloadPdf = id => {
    const rep = reports.find(r => r.id === id);
    if (!rep) return;
    const doc = new jsPDF({ unit: 'pt', format: 'letter' });
    doc.setFontSize(18);
    doc.text(rep.title, 40, 60);
    doc.setFontSize(12);
    doc.text(`Student: ${rep.studentName}`, 40, 90);
    doc.text(`Major: ${rep.major}`, 40, 110);
    doc.text(`Semester: ${rep.semester}`, 40, 130);
    doc.text(`Company: ${rep.companyName}`, 40, 150);
    doc.text(`Submission Date: ${rep.submissionDate}`, 40, 170);
    doc.text(`Status: ${rep.status}`, 40, 190);
    doc.text('--- Report Content ---', 40, 220);
    // split content into lines that fit page
    const lines = doc.splitTextToSize(rep.reportContent, 500);
    doc.text(lines, 40, 240);
    doc.text('--- Clarification ---', 40, 240 + lines.length * 14 + 20);
    const clarLines = doc.splitTextToSize(rep.clarification || 'None provided.', 500);
    doc.text(clarLines, 40, 260 + lines.length * 14 + 20);
    doc.save(`report-${id}.pdf`);
  };

  // Pagination slicing
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(start, start + itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Hero */}
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
          <h1 className="text-4xl font-bold mb-2">Internship Reports</h1>
          <p className="text-xl text-blue-100 mb-8">
            Review and clarify flagged or rejected reports.
          </p>
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
            <input
              type="text"
              placeholder="Search by student or title"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay: 0.3 }}
        className="relative z-20 max-w-7xl mx-auto px-6 py-6 -mt-12 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-wrap gap-4"
      >
        <Filter onFilter={handleFilter} />
      </motion.div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg border overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#00106A]/90 text-white">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Major</th>
                <th className="p-3 text-left">Semester</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(r => (
                <tr key={r.id} className="hover:bg-gray-50 border-b">
                  <td className="p-3">{r.studentName}</td>
                  <td className="p-3">{r.major}</td>
                  <td className="p-3">{r.semester}</td>
                  <td className="p-3">{r.submissionDate}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                      r.status === 'Accepted'
                        ? 'bg-green-100 text-green-800'
                        : r.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : r.status === 'Flagged'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => {
                        setSelectedReport(r);
                        setClarification(r.clarification || '');
                      }}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => downloadPdf(r.id)}
                      className="px-2 py-1 border rounded hover:bg-gray-200"
                    >
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr><td colSpan="6" className="p-3 text-center text-gray-500">No reports.</td></tr>
              )}
            </tbody>
          </table>
          {totalPages > 0 && (
            <div className="border-t p-3">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={n => setCurrentPage(n + 1)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Clarification Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale:0.9, opacity:0 }}
            animate={{ scale:1, opacity:1 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedReport.title}</h2>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Report Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p><strong>Student:</strong> {selectedReport.studentName}</p>
                  <p><strong>Major:</strong> {selectedReport.major}</p>
                  <p><strong>Semester:</strong> {selectedReport.semester}</p>
                  <p><strong>Company:</strong> {selectedReport.companyName}</p>
                  <p><strong>Status:</strong> {selectedReport.status}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Report Content</h3>
                  <div className="bg-gray-50 p-3 rounded whitespace-pre-line">
                    {selectedReport.reportContent}
                  </div>
                </div>
              </div>

              {/* Faculty Clarification */}
              {(selectedReport.status === 'Flagged' || selectedReport.status === 'Rejected') && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Faculty Clarification</h3>
                  <textarea
                    value={clarification}
                    onChange={e => setClarification(e.target.value)}
                    placeholder="Provide your clarification..."
                    className="w-full h-32 p-2 border rounded"
                  />
                  <button
                    onClick={() => {
                      setReports(rs =>
                        rs.map(r =>
                          r.id === selectedReport.id
                            ? { ...r, clarification }
                            : r
                        )
                      );
                      setSelectedReport(r => ({ ...r, clarification }));
                      success('Clarification submitted!');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Submit Clarification
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
