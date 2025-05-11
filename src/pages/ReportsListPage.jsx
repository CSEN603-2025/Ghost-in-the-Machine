import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import ReportDetailsModal from '../components/ReportDetailsModal';
import MainActionButton from '../components/MainActionButton';
import ReportsNavbar from '../components/GenericTopBar';

export default function ReportsListPage() {
  const navigate = useNavigate();

  // Full list + filtered view
  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterData, setFilterData] = useState({ major: '', status: '' });

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

    // apply major/status filters
    if (filterData.major) {
      temp = temp.filter(r => r.major === filterData.major);
    }
    if (filterData.status) {
      temp = temp.filter(r => r.status === filterData.status);
    }

    // apply search
    if (searchTerm) {
      const key = searchTerm.toLowerCase();
      temp = temp.filter(r =>
        r.studentName.toLowerCase().includes(key) ||
        r.title.toLowerCase().includes(key)
      );
    }

    setFiltered(temp);
  }, [searchTerm, filterData, reports]);

  const handleFilter = (data) => setFilterData(data);

  // Download PDF helper
  const downloadPdf = (id) => {
    const link = document.createElement('a');
    link.href = `/api/reports/${id}/download`;
    link.download = `report-${id}.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      {/* Top Navbar */}
      <ReportsNavbar title="Internship Reports" />

      {/* Search & Filter */}
      <div className="px-6 py-4 bg-white border-b border-gray-200 flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Search by student name or report title"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-[#00106A] focus:ring focus:ring-[#00106A]/50"
        />
        <Filter onFilter={handleFilter} />
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto px-6 py-8">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
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
            {filtered.map(report => (
              <tr key={report.id} className="border-b last:border-none">
                <td className="p-3">{report.studentName}</td>
                <td className="p-3">{report.major}</td>
                <td className="p-3">{report.semester}</td>
                <td className="p-3">{report.submissionDate}</td>
                <td className="p-3">{report.status}</td>
                <td className="p-3 flex items-center space-x-4">
                  <MainActionButton
                    variant="primary"
                    onClick={() => setSelectedReport(report)}
                  >
                    View Details
                  </MainActionButton>
                  <MainActionButton
                    variant="secondary"
                    onClick={() => downloadPdf(report.id)}
                  >
                    Download as PDF
                  </MainActionButton>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="6" className="p-3 text-center text-gray-500">No reports found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 pb-12">
        <Pagination />
      </div>

      {/* Details Modal */}
      {selectedReport && (
        <ReportDetailsModal
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          report={selectedReport}
          onStatusChange={(id, newStatus) => {
            setReports(rs => rs.map(r => r.id === id ? { ...r, status: newStatus } : r));
          }}
        />
      )}
    </div>
  );
}
