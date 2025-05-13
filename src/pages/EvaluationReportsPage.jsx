import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClipboardList, FaSearch, FaTimes } from 'react-icons/fa';
import FilterEvaluation from '../components/FilterEvaluation';
import Pagination from '../components/Pagination';
import EvaluationDetailsModal from '../components/EvaluationDetailsModal';

const detailsVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: 30 },
};

export default function EvaluationReportsPage() {
  const navigate = useNavigate();
  const [evals, setEvals] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState({ company: '', supervisor: '' });
  const [selectedEval, setSelectedEval] = useState(null);

  // load mock
  useEffect(() => {
    const mock = [
      { id:1, studentName:'John Doe', companyName:'TechCorp', supervisor:'Alice Johnson', internshipDates:'Jan 1 – Mar 31, 2025', evaluationContent:'John performed excellently…' },
      { id:2, studentName:'Jane Smith', companyName:'DesignCo', supervisor:'Bob Lee', internshipDates:'Feb 15 – May 15, 2025', evaluationContent:'Jane showed great creativity…' },
    ];
    setEvals(mock);
    setFiltered(mock);
  }, []);

  // filtering
  useEffect(() => {
    let temp = evals;
    if (filterData.company)    temp = temp.filter(e => e.companyName.includes(filterData.company));
    if (filterData.supervisor) temp = temp.filter(e => e.supervisor.includes(filterData.supervisor));
    if (search) {
      const key = search.toLowerCase();
      temp = temp.filter(e =>
        e.studentName.toLowerCase().includes(key) ||
        e.companyName.toLowerCase().includes(key)
      );
    }
    setFiltered(temp);
  }, [search, filterData, evals]);

  const downloadPdf = id => {
    const a = document.createElement('a');
    a.href = `/api/evaluations/${id}/download`;
    a.download = `evaluation-${id}.pdf`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95" />
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center text-white">
          <FaClipboardList size={48} className="mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Evaluation Reports</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Browse post-internship feedback submitted by supervisors
          </p>
          <div className="w-full max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-blue-300" />
            </div>
            <input
              type="text"
              placeholder="Search evaluations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-7xl mx-auto px-6 py-6 -mt-12 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-wrap items-center gap-4"
      >
        <FilterEvaluation onFilter={setFilterData} />
      </motion.div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-6 py-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#00106A]/90 text-white">
            <tr>
              <th className="p-3 text-left">Student Name</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Supervisor</th>
              <th className="p-3 text-left">Dates</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No evaluations found.
                </td>
              </tr>
            )}
            {filtered.map(e => (
              <tr key={e.id} className="border-b last:border-none">
                <td className="p-3">{e.studentName}</td>
                <td className="p-3">{e.companyName}</td>
                <td className="p-3">{e.supervisor}</td>
                <td className="p-3">{e.internshipDates}</td>
                <td className="p-3 flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedEval(e)}
                    className="px-3 py-1 bg-[#274472] text-white rounded hover:bg-[#41729F] transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => downloadPdf(e.id)}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pt-6">
          <Pagination />
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedEval && (
          <EvaluationDetailsModal
            isOpen={!!selectedEval}
            onClose={() => setSelectedEval(null)}
            evaluation={selectedEval}
            variants={detailsVariants}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
