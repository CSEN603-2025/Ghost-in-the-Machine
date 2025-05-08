import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ManageReportsAndEvaluations = () => {
  const [reports, setReports] = useState([
    // Internship Reports
    {
      id: 1,
      type: 'internship',
      studentName: 'John Doe',
      companyName: 'ABC Corp',
      major: 'Computer Science',
      status: 'Pending',
      submissionDate: '2025-03-01',
      clarification: '',
      details: 'Worked on web development using React.js and Node.js.',
    },
    {
      id: 2,
      type: 'internship',
      studentName: 'Alice Johnson',
      companyName: 'Acme Co',
      major: 'Business',
      status: 'Rejected',
      submissionDate: '2025-02-15',
      clarification: '',
      details: 'Handled client-side marketing data analysis.',
    },
    {
      id: 3,
      type: 'internship',
      studentName: 'Layla Hassan',
      companyName: 'InnovaTech',
      major: 'Electrical Engineering',
      status: 'Accepted',
      submissionDate: '2025-02-28',
      clarification: 'Reviewed by SCAD office.',
      details: 'Worked on circuit testing and hardware design tasks.',
    },
    {
      id: 4,
      type: 'internship',
      studentName: 'Layla Hassan',
      companyName: 'InnovaTech',
      major: 'Electrical Engineering',
      status: 'Flagged',
      submissionDate: '2025-02-28',
      clarification: 'Reviewed by SCAD office.',
      details: 'Worked on circuit testing and hardware design tasks.',
    },

    // Evaluation Reports
    {
      id: 5,
      type: 'evaluation',
      studentName: 'Ahmed Nour',
      companyName: 'SmartSystems',
      mainSupervisor: 'Dr. Khaled Zaki',
      internshipStartDate: '2025-01-01',
      internshipEndDate: '2025-06-01',
      evaluationComments: 'Excellent leadership, teamwork, and technical skills.',
      submissionDate: '2025-06-10',
      rating: 4.5,
    },
    {
      id: 6,
      type: 'evaluation',
      studentName: 'Sara Ayman',
      companyName: 'NextGen',
      mainSupervisor: 'Eng. Heba Kamal',
      internshipStartDate: '2025-03-10',
      internshipEndDate: '2025-07-20',
      evaluationComments: 'Very committed and eager to learn.',
      submissionDate: '2025-07-25',
      rating: 4.2,
    },
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [clarificationInput, setClarificationInput] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [filter, setFilter] = useState({ major: '', status: '', search: '' });

  // Filter reports
  const filteredInternships = reports.filter(
    (r) =>
      r.type === 'internship' &&
      (filter.major ? r.major === filter.major : true) &&
      (filter.status ? r.status === filter.status : true) &&
      (filter.search
        ? r.studentName.toLowerCase().includes(filter.search.toLowerCase()) ||
          r.companyName.toLowerCase().includes(filter.search.toLowerCase())
        : true)
  );

  const evaluations = reports.filter((r) => r.type === 'evaluation');

  // Report actions
  const openReportPopup = (report) => {
    setSelectedReport(report);
    setClarificationInput(report.clarification || '');
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedReport(null);
    setClarificationInput('');
  };

  const submitClarification = () => {
    const updated = reports.map((r) =>
      r.id === selectedReport.id ? { ...r, clarification: clarificationInput } : r
    );
    setReports(updated);
    closePopup();
  };

  const downloadPDF = (report) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(report.type === 'internship' ? 'Internship Report' : 'Evaluation Report', 20, 20);
    doc.setFontSize(12);
    
    if (report.type === 'internship') {
      doc.text(`Student: ${report.studentName}`, 20, 40);
      doc.text(`Company: ${report.companyName}`, 20, 50);
      doc.text(`Major: ${report.major}`, 20, 60);
      doc.text(`Status: ${report.status}`, 20, 70);
      doc.text(`Submitted: ${report.submissionDate}`, 20, 80);
      doc.text(`Details: ${report.details}`, 20, 90);
      doc.text(`Clarification: ${report.clarification || 'None'}`, 20, 100);
    } else {
      doc.text(`Student: ${report.studentName}`, 20, 40);
      doc.text(`Company: ${report.companyName}`, 20, 50);
      doc.text(`Supervisor: ${report.mainSupervisor}`, 20, 60);
      doc.text(`Period: ${report.internshipStartDate} to ${report.internshipEndDate}`, 20, 70);
      doc.text(`Submitted: ${report.submissionDate}`, 20, 80);
      doc.text(`Rating: ${report.rating}/5`, 20, 90);
      doc.text(`Comments: ${report.evaluationComments}`, 20, 100);
    }
    
    doc.save(`${report.studentName}_${report.type}_report.pdf`);
  };

  // Statistics logic
  const internshipReports = reports.filter(r => r.type === 'internship');
  const evaluationReports = reports.filter(r => r.type === 'evaluation');

  // Status over time chart
  const statusAccumulator = {};
  internshipReports.forEach(r => {
    const d = new Date(r.submissionDate);
    const cycle = `${d.getMonth() + 1}/${d.getFullYear()}`;
    if (!statusAccumulator[cycle]) statusAccumulator[cycle] = { Accepted: 0, Rejected: 0, Flagged: 0, Pending: 0 };
    if (['Accepted', 'Rejected', 'Flagged', 'Pending'].includes(r.status)) statusAccumulator[cycle][r.status]++;
  });
  const statusLabels = Object.keys(statusAccumulator).sort((a, b) => new Date(a) - new Date(b));
  const statusDatasets = ['Accepted', 'Rejected', 'Flagged', 'Pending'].map((status, idx) => ({
    label: status,
    data: statusLabels.map(cycle => statusAccumulator[cycle][status] || 0),
    backgroundColor: 
      idx === 0 ? '#4ade80' : 
      idx === 1 ? '#f87171' : 
      idx === 2 ? '#facc15' : '#60a5fa',
  }));

  // Review time chart
  const reviewAccumulator = {};
  const reviewCounts = {};
  evaluationReports.forEach(r => {
    const end = new Date(r.internshipEndDate);
    const submit = new Date(r.submissionDate);
    const days = Math.round((submit - end) / (1000 * 60 * 60 * 24));
    const cycle = `${submit.getMonth() + 1}/${submit.getFullYear()}`;
    reviewAccumulator[cycle] = (reviewAccumulator[cycle] || 0) + days;
    reviewCounts[cycle] = (reviewCounts[cycle] || 0) + 1;
  });
  const reviewLabels = Object.keys(reviewAccumulator).sort((a, b) => new Date(a) - new Date(b));
  const reviewData = reviewLabels.map(cycle => Math.round(reviewAccumulator[cycle] / reviewCounts[cycle]));

  // Major distribution chart
  const majorCounts = {};
  internshipReports.forEach(r => majorCounts[r.major] = (majorCounts[r.major] || 0) + 1);
  const majorLabels = Object.keys(majorCounts);
  const majorData = majorLabels.map(m => majorCounts[m]);

  // Company ratings chart
  const ratingMap = {};
  evaluationReports.forEach(r => {
    if (!ratingMap[r.companyName]) ratingMap[r.companyName] = { total: 0, count: 0 };
    ratingMap[r.companyName].total += r.rating;
    ratingMap[r.companyName].count++;
  });
  const avgRatings = Object.entries(ratingMap)
    .map(([company, val]) => ({ company, avg: val.total / val.count }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 5);
  const ratingLabels = avgRatings.map(r => r.company);
  const ratingData = avgRatings.map(r => +r.avg.toFixed(2));

  // Company popularity chart
  const companyCounts = {};
  internshipReports.forEach(r => companyCounts[r.companyName] = (companyCounts[r.companyName] || 0) + 1);
  const topCompanies = Object.entries(companyCounts)
    .map(([company, cnt]) => ({ company, cnt }))
    .sort((a, b) => b.cnt - a.cnt)
    .slice(0, 5);
  const companyLabels = topCompanies.map(c => c.company);
  const companyData = topCompanies.map(c => c.cnt);

  // PDF export for statistics
  const downloadStatisticsPDF = async () => {
    const input = document.getElementById('statisticsSection');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'pt', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('Internship_Report_Statistics.pdf');
  };

  return (
    <div className="p-8 bg-[#f4f6f8] min-h-screen">
      <h1 className="text-4xl font-bold text-[#00106A] mb-10">Manage Reports & Evaluations</h1>

      {/* ================== INTERNSHIP REPORTS ================== */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-[#00106A]">Internship Reports</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            className="border rounded-md px-4 py-2"
            onChange={(e) => setFilter({ ...filter, major: e.target.value })}
          >
            <option value="">Filter by Major</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Business">Business</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
          </select>
          <select
            className="border rounded-md px-4 py-2"
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="">Filter by Status</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Flagged">Flagged</option>
          </select>
          <input
            className="border px-4 py-2 rounded-md w-64"
            placeholder="Search student or company"
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>

        {/* Internship Reports Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Student</th>
                <th className="px-4 py-2">Company</th>
                <th className="px-4 py-2">Major</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Submitted</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInternships.map((report) => (
                <tr key={report.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{report.studentName}</td>
                  <td className="px-4 py-2">{report.companyName}</td>
                  <td className="px-4 py-2">{report.major}</td>
                  <td className="px-4 py-2">{report.status}</td>
                  <td className="px-4 py-2">{report.submissionDate}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openReportPopup(report)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => downloadPDF(report)}
                      className="text-blue-600 hover:underline"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInternships.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================== EVALUATION REPORTS ================== */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-[#00106A]">Evaluation Reports</h2>
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Student</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Supervisor</th>
              <th className="px-4 py-2">Dates</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((evalReport) => (
              <tr key={evalReport.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{evalReport.studentName}</td>
                <td className="px-4 py-2">{evalReport.companyName}</td>
                <td className="px-4 py-2">{evalReport.mainSupervisor}</td>
                <td className="px-4 py-2">{`${evalReport.internshipStartDate} - ${evalReport.internshipEndDate}`}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openReportPopup(evalReport)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {evaluations.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No evaluation reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* ================== STATISTICS SECTION ================== */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#00106A]">Reports Statistics</h2>
          <button
            onClick={downloadStatisticsPDF}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
          >
            Download Statistics PDF
          </button>
        </div>

        <div id="statisticsSection">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-4 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-center mb-4">Internship Status Over Time</h3>
              <Chart
                type="bar"
                data={{
                  labels: statusLabels,
                  datasets: statusDatasets,
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </div>
            <div className="p-4 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-center mb-4">Average Review Time (Days)</h3>
              <Chart
                type="line"
                data={{
                  labels: reviewLabels,
                  datasets: [{
                    label: 'Average Days to Review',
                    data: reviewData,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.3,
                  }],
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="p-4 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-center mb-4">Internships by Major</h3>
              <Chart
                type="pie"
                data={{
                  labels: majorLabels,
                  datasets: [{
                    data: majorData,
                    backgroundColor: ['#34d399', '#fbbf24', '#60a5fa'],
                    borderWidth: 1,
                  }],
                }}
              />
            </div>
            <div className="p-4 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-center mb-4">Top Companies by Internship Count</h3>
              <Chart
                type="bar"
                data={{
                  labels: companyLabels,
                  datasets: [{
                    label: 'Internship Count',
                    data: companyData,
                    backgroundColor: '#10b981',
                  }],
                }}
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="p-4 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-center mb-4">Top Companies by Rating</h3>
              <Chart
                type="bar"
                data={{
                  labels: ratingLabels,
                  datasets: [{
                    label: 'Average Rating',
                    data: ratingData,
                    backgroundColor: '#4ade80',
                  }],
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================== DETAILS POPUP ================== */}
      {popupOpen && selectedReport && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4 text-[#00106A]">
              {selectedReport.type === 'internship' ? 'Internship Report Details' : 'Evaluation Report Details'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Student Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedReport.studentName}</p>
                  <p><span className="font-medium">Company:</span> {selectedReport.companyName}</p>
                  {selectedReport.type === 'internship' && (
                    <>
                      <p><span className="font-medium">Major:</span> {selectedReport.major}</p>
                      <p><span className="font-medium">Status:</span> 
                        <span className={`ml-2 px-2 py-1 rounded text-sm ${
                          selectedReport.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                          selectedReport.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          selectedReport.status === 'Flagged' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {selectedReport.status}
                        </span>
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Report Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Submission Date:</span> {selectedReport.submissionDate}</p>
                  {selectedReport.type === 'evaluation' && (
                    <>
                      <p><span className="font-medium">Supervisor:</span> {selectedReport.mainSupervisor}</p>
                      <p><span className="font-medium">Internship Period:</span> {selectedReport.internshipStartDate} to {selectedReport.internshipEndDate}</p>
                      <p><span className="font-medium">Rating:</span> {selectedReport.rating}/5</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">
                {selectedReport.type === 'internship' ? 'Internship Details' : 'Evaluation Comments'}
              </h3>
              <div className="bg-gray-50 p-4 rounded">
                <p className="whitespace-pre-line">
                  {selectedReport.type === 'internship' 
                    ? selectedReport.details 
                    : selectedReport.evaluationComments}
                </p>
              </div>
            </div>

            {selectedReport.type === 'internship' && (selectedReport.status === 'Flagged' || selectedReport.status === 'Rejected') && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Clarification Notes</h3>
                <textarea
                  value={clarificationInput}
                  onChange={(e) => setClarificationInput(e.target.value)}
                  className="w-full border rounded p-2 h-24"
                  placeholder="Add clarification notes..."
                />
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={closePopup}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Close
              </button>
              <button
                onClick={() => downloadPDF(selectedReport)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Download PDF
              </button>
              {selectedReport.type === 'internship' && (selectedReport.status === 'Flagged' || selectedReport.status === 'Rejected') && (
                <button
                  onClick={submitClarification}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                  Save Clarification
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReportsAndEvaluations;