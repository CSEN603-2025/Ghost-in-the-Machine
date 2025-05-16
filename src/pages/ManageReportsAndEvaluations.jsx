import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
      studentName: 'Noha Ahmed',
      companyName: 'InnovaTech',
      major: 'Electrical Engineering',
      status: 'Flagged',
      submissionDate: '2025-02-28',
      clarification: '',
      details: 'Worked on circuit testing and hardware design tasks.',
    },
    {
      id: 5,
      type: 'internship',
      studentName: 'Rana Ali',
      companyName: 'Synapse',
      major: 'Computer Science',
      status: 'Accepted',
      submissionDate: '2025-02-28',
      clarification: 'Reviewed by SCAD office.',
      details: 'Worked on Data Analysis.',
    },
    {
      id: 6,
      type: 'internship',
      studentName: 'Mazen Ahmed',
      companyName: 'CIB',
      major: 'Business',
      status: 'Accepted',
      submissionDate: '2025-02-28',
      clarification: 'Reviewed by SCAD office.',
      details: 'Worked on Marketing.',
    },
    {
      id: 7,
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
      id: 8,
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
    {
      id: 9,
      type: 'evaluation',
      studentName: 'Mohamed Ayman',
      companyName: 'Synapse',
      mainSupervisor: 'Eng. Omar Ghareeb',
      internshipStartDate: '2025-03-10',
      internshipEndDate: '2025-07-20',
      evaluationComments: 'Eager to learn.',
      submissionDate: '2025-07-25',
      rating: 4.7,
    },
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [clarificationInput, setClarificationInput] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [filter, setFilter] = useState({ major: '', status: '', search: '' });
  const [activeTab, setActiveTab] = useState('reports');
  const navigate = useNavigate();

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

  const internshipReports = reports.filter(r => r.type === 'internship');
  const evaluationReports = reports.filter(r => r.type === 'evaluation');

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

  const majorCounts = {};
  internshipReports.forEach(r => majorCounts[r.major] = (majorCounts[r.major] || 0) + 1);
  const majorLabels = Object.keys(majorCounts);
  const majorData = majorLabels.map(m => majorCounts[m]);

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

  const companyCounts = {};
  internshipReports.forEach(r => companyCounts[r.companyName] = (companyCounts[r.companyName] || 0) + 1);
  const topCompanies = Object.entries(companyCounts)
    .map(([company, cnt]) => ({ company, cnt }))
    .sort((a, b) => b.cnt - a.cnt)
    .slice(0, 5);
  const companyLabels = topCompanies.map(c => c.company);
  const companyData = topCompanies.map(c => c.cnt);

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
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
      >
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate('/scad-dashboard')}
          className="absolute top-6 left-6 z-30 flex items-center text-white hover:underline"
        >
          <ArrowLeft className="mr-1 w-5 h-5" /> Back
        </motion.button>

        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95"></div>
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Manage Reports & Evaluations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            View and manage all internship reports and evaluations
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </motion.div>

      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="flex border-b">
            <button
              className={`px-6 py-4 font-medium ${activeTab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </button>
            <button
              className={`px-6 py-4 font-medium ${activeTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>
          </div>

          {activeTab === 'reports' && (
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Internship Reports</h2>
                <div className="flex flex-wrap gap-4 mb-6">
                  <select
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setFilter({ ...filter, major: e.target.value })}
                  >
                    <option value="">All Majors</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business">Business</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                  </select>
                  <select
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                  >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Flagged">Flagged</option>
                  </select>
                  <div className="relative flex-grow max-w-md">
                    <input
                      type="text"
                      placeholder="Search students or companies..."
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                    />
                    <svg
                      className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Major</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredInternships.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.studentName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.companyName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.major}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              report.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                              report.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                              report.status === 'Flagged' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.submissionDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => openReportPopup(report)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              View
                            </button>
                            <button
                              onClick={() => downloadPDF(report)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredInternships.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      No internship reports found matching your criteria
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Evaluation Reports</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {evaluations.map((evalReport) => (
                        <tr key={evalReport.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{evalReport.studentName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{evalReport.companyName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{evalReport.mainSupervisor}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {`${evalReport.internshipStartDate} - ${evalReport.internshipEndDate}`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => openReportPopup(evalReport)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              View
                            </button>
                            <button
                              onClick={() => downloadPDF(evalReport)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {evaluations.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      No evaluation reports found
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">Reports Analytics</h2>
                <button
                  onClick={downloadStatisticsPDF}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export as PDF
                </button>
              </div>

              <div id="statisticsSection" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Internship Status Over Time</h3>
                    <div className="h-80">
                      <Chart
                        type="bar"
                        data={{
                          labels: statusLabels,
                          datasets: statusDatasets,
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                          },
                          scales: {
                            x: {
                              grid: {
                                display: false
                              }
                            },
                            y: {
                              beginAtZero: true,
                              grid: {
                                color: '#f3f4f6'
                              }
                            }
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Average Review Time (Days)</h3>
                    <div className="h-80">
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
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              display: false
                            },
                          },
                          scales: {
                            x: {
                              grid: {
                                display: false
                              }
                            },
                            y: {
                              beginAtZero: true,
                              grid: {
                                color: '#f3f4f6'
                              }
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Most Frequently Used Courses</h3>
                    <div className="h-80">
                      <Chart
                        type="doughnut"
                        data={{
                          labels: majorLabels.map(major => 
                            major === 'Computer Science' ? 'CSEN401' :
                            major === 'Business' ? 'BI602' :
                            'ELCT501'
                          ),
                          datasets: [{
                            data: majorData,
                            backgroundColor: ['#4f46e5', '#10b981', '#f59e0b'],
                            borderWidth: 0,
                          }],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'right',
                              labels: {
                                font: {
                                  size: 14
                                }
                              }
                            },
                          },
                          cutout: '70%',
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Top Companies by Internship Count</h3>
                    <div className="h-80">
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
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              display: false
                            },
                          },
                          scales: {
                            x: {
                              grid: {
                                display: false
                              }
                            },
                            y: {
                              beginAtZero: true,
                              grid: {
                                color: '#f3f4f6'
                              }
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Top Companies by Rating</h3>
                  <div className="h-80">
                    <Chart
                      type="bar"
                      data={{
                        labels: ratingLabels,
                        datasets: [{
                          label: 'Average Rating',
                          data: ratingData,
                          backgroundColor: '#f59e0b',
                        }],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false
                          },
                        },
                        scales: {
                          x: {
                            grid: {
                              display: false
                            }
                          },
                          y: {
                            beginAtZero: true,
                            max: 5,
                            grid: {
                              color: '#f3f4f6'
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {popupOpen && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedReport.type === 'internship' ? 'Internship Report Details' : 'Evaluation Report Details'}
                </h2>
                <button
                  onClick={closePopup}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Student Information</h3>
                  <div className="space-y-3">
                    <div className="flex">
                      <span className="text-gray-600 font-medium w-32">Name:</span>
                      <span className="text-gray-800">{selectedReport.studentName}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 font-medium w-32">Company:</span>
                      <span className="text-gray-800">{selectedReport.companyName}</span>
                    </div>
                    {selectedReport.type === 'internship' && (
                      <>
                        <div className="flex">
                          <span className="text-gray-600 font-medium w-32">Major:</span>
                          <span className="text-gray-800">{selectedReport.major}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-600 font-medium w-32">Status:</span>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            selectedReport.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                            selectedReport.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                            selectedReport.status === 'Flagged' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {selectedReport.status}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Report Information</h3>
                  <div className="space-y-3">
                    <div className="flex">
                      <span className="text-gray-600 font-medium w-32">Submitted:</span>
                      <span className="text-gray-800">{selectedReport.submissionDate}</span>
                    </div>
                    {selectedReport.type === 'evaluation' && (
                      <>
                        <div className="flex">
                          <span className="text-gray-600 font-medium w-32">Supervisor:</span>
                          <span className="text-gray-800">{selectedReport.mainSupervisor}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-600 font-medium w-32">Internship Period:</span>
                          <span className="text-gray-800">{`${selectedReport.internshipStartDate} to ${selectedReport.internshipEndDate}`}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-600 font-medium w-32">Rating:</span>
                          <div className="flex items-center">
                            <span className="text-gray-800 mr-2">{selectedReport.rating}/5</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(selectedReport.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  {selectedReport.type === 'internship' ? 'Internship Details' : 'Evaluation Comments'}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedReport.type === 'internship' 
                      ? selectedReport.details 
                      : selectedReport.evaluationComments}
                  </p>
                </div>
              </div>

              {selectedReport.type === 'internship' && (selectedReport.status === 'Flagged' || selectedReport.status === 'Rejected') && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Clarification Notes</h3>
                  <textarea
                    value={clarificationInput}
                    onChange={(e) => setClarificationInput(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    placeholder="Add clarification notes..."
                  />
                </div>
              )}

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={closePopup}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => downloadPDF(selectedReport)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
                {selectedReport.type === 'internship' && (selectedReport.status === 'Flagged' || selectedReport.status === 'Rejected') && (
                  <button
                    onClick={submitClarification}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Clarification
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReportsAndEvaluations;