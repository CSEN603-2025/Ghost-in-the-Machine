import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterEvaluation from '../components/FilterEvaluation';
import Pagination from '../components/Pagination';
import EvaluationDetailsModal from '../components/EvaluationDetailsModal';

export default function EvaluationReportsPage() {
  const navigate = useNavigate();

  // Data + filtered
  const [evals, setEvals] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Search & filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterData, setFilterData] = useState({ company: '', supervisor: '' });

  // Modal
  const [selectedEval, setSelectedEval] = useState(null);

  // Load mock data
  useEffect(() => {
    const mock = [
      {
        id: 1,
        studentName: 'John Doe',
        companyName: 'TechCorp',
        supervisor: 'Alice Johnson',
        internshipDates: 'Jan 1, 2025 – Mar 31, 2025',
        evaluationContent: 'John performed excellently…',
      },
      {
        id: 2,
        studentName: 'Jane Smith',
        companyName: 'DesignCo',
        supervisor: 'Bob Lee',
        internshipDates: 'Feb 15, 2025 – May 15, 2025',
        evaluationContent: 'Jane showed great creativity…',
      },
    ];
    setEvals(mock);
    setFiltered(mock);
  }, []);

  // Re-filter on search/filter/data changes
  useEffect(() => {
    let temp = evals;

    if (filterData.company) {
      temp = temp.filter(e => e.companyName.includes(filterData.company));
    }
    if (filterData.supervisor) {
      temp = temp.filter(e => e.supervisor.includes(filterData.supervisor));
    }
    if (searchTerm) {
      const key = searchTerm.toLowerCase();
      temp = temp.filter(e =>
        e.studentName.toLowerCase().includes(key) ||
        e.companyName.toLowerCase().includes(key)
      );
    }

    setFiltered(temp);
  }, [searchTerm, filterData, evals]);

  const handleFilter = (data) => setFilterData(data);

  const downloadPdf = (id) => {
    const link = document.createElement('a');
    link.href = `/api/evaluations/${id}/download`;
    link.download = `evaluation-${id}.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      {/* Navbar */}
      <div className="w-full bg-[#00106A] py-6 px-6 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
          Home
        </button>
        <h1 className="text-3xl font-bold text-white">Evaluation Reports</h1>
        <button onClick={() => navigate('/welcome')} className="bg-gradient-to-r from-red-500 to-red-400 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300">
          Logout
        </button>
      </div>

      {/* Search & Filter */}
      <div className="px-6 py-4 bg-white border-b border-gray-200 flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Search by student or company"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-[#00106A] focus:ring focus:ring-[#00106A]/50"
        />
        <FilterEvaluation onFilter={handleFilter} />
      </div>

      {/* Evaluations Table */}
      <div className="overflow-x-auto px-6 py-8">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
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
                    View Details
                  </button>
                  <button
                    onClick={() => downloadPdf(e.id)}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 4v16m8-8H4"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="5" className="p-3 text-center text-gray-500">No evaluations found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 pb-12">
        <Pagination />
      </div>

      {/* Details Modal */}
      {selectedEval && (
        <EvaluationDetailsModal
          isOpen={!!selectedEval}
          onClose={() => setSelectedEval(null)}
          evaluation={selectedEval}
        />
      )}
    </div>
  );
}
