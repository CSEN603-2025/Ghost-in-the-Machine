import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FilterEvaluation from '../components/FilterEvaluation';
import Pagination from '../components/Pagination';
import EvaluationCard from '../components/EvaluationCard';
import EvaluationDetailsModal from '../components/EvaluationDetailsModal';

export default function EvaluationReportsPage() {
  const navigate = useNavigate();
  const [evals, setEvals] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const mockEvals = [
      {
        id: 1,
        title: 'Evaluation for John Doe',
        studentName: 'John Doe',
        companyName: 'TechCorp',
        supervisorName: 'Alice Johnson',
        startDate: '2025-01-01',
        endDate: '2025-03-31',
        evaluationContent: 'John performed excellently...',
      },
      {
        id: 2,
        title: 'Evaluation for Jane Smith',
        studentName: 'Jane Smith',
        companyName: 'DesignCo',
        supervisorName: 'Bob Lee',
        startDate: '2025-02-15',
        endDate: '2025-05-15',
        evaluationContent: 'Jane showed great creativity...',
      },
      // …more
    ];
    setEvals(mockEvals);
    setFiltered(mockEvals);
  }, []);

  const handleFilter = ({ company, supervisor }) =>
    setFiltered(
      evals.filter(e =>
        (company ? e.companyName.includes(company) : true) &&
        (supervisor ? e.supervisorName.includes(supervisor) : true)
      )
    );

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
        <h1 className="text-3xl font-bold text-white">Evaluation Reports</h1>
        <button
          onClick={logout}
          className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* Filter */}
      <div className="px-6 py-4 bg-[#ffffff] border-b border-gray-200">
        <FilterEvaluation onFilter={handleFilter} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-12 pt-10">
        {filtered.map(e => (
          <EvaluationCard key={e.id} evalReport={e} onSelect={setSelected} />
        ))}
      </div>

      {/* Pagination */}
      <div className="px-6 pb-12">
        <Pagination />
      </div>

      {/* Details Modal */}
      {selected && (
        <EvaluationDetailsModal
          evalReport={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
