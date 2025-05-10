import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import KpiCard from '../components/KpiCard';
import StatsFilters from '../components/StatsFilters';
import ExportCsvDropdown from '../components/ExportCsvDropdown';
import GeneratePdfModal from '../components/GeneratePdfModal';

export default function StatsPage() {
  const navigate = useNavigate();

  // --- State ---
  const [cycle, setCycle] = useState({ start: '2025-01-01', end: '2025-06-30' });
  const [major, setMajor] = useState('');
  const [showPdfModal, setShowPdfModal] = useState(false);

  // dummy KPI data
  const [kpis, setKpis] = useState({
    accepted: 12,
    rejected: 4,
    flagged: 3,
    avgReviewTime: '2.4 days',
    topCourses: ['CS101', 'GD202', 'EE301'],
    topCompanies: ['TechCorp', 'DesignCo', 'InnoSoft'],
    companyInternCount: [
      { name: 'TechCorp', count: 8 },
      { name: 'DesignCo', count: 5 },
      { name: 'InnoSoft', count: 3 },
    ],
  });

  // re-fetch or recalc KPIs when cycle or major changes
  useEffect(() => {
    // placeholder: fetch new kpis from API using cycle & major
  }, [cycle, major]);

  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      {/* Top Navbar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-[#00106A] py-6 px-6 flex items-center justify-between text-white sticky top-0 z-50"
      >
        <button onClick={() => navigate('/')} className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black py-2 px-4 rounded-lg shadow transition">
          Home
        </button>
        <h1 className="text-3xl font-bold">Statistics</h1>
        <div className="flex space-x-3">
          <ExportCsvDropdown kpis={kpis} cycle={cycle} major={major} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPdfModal(true)}
            className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black py-2 px-4 rounded-lg shadow transition"
          >
            Generate PDF
          </motion.button>
          <button onClick={() => navigate('/welcome')} className="bg-gradient-to-r from-red-500 to-red-400 text-white py-2 px-4 rounded-lg shadow">
            Logout
          </button>
        </div>
      </motion.div>

      {/* Filters Toolbar */}
      <div className="max-w-7xl mx-auto px-6 py-6 bg-white border-b border-gray-200">
        <StatsFilters
          cycle={cycle}
          onCycleChange={setCycle}
          major={major}
          onMajorChange={setMajor}
        />
      </div>

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <KpiCard label="Accepted Reports" value={kpis.accepted} color="from-green-400 to-green-500" />
        <KpiCard label="Rejected Reports" value={kpis.rejected} color="from-red-400 to-red-500" />
        <KpiCard label="Flagged Reports" value={kpis.flagged} color="from-yellow-400 to-yellow-500" />
        <KpiCard label="Avg Review Time" value={kpis.avgReviewTime} color="from-blue-400 to-blue-500" />
        <KpiCard label="Top Courses Used" value={kpis.topCourses.join(', ')} color="from-purple-400 to-purple-500" />
        <KpiCard
          label="Top-Rated Companies"
          value={kpis.topCompanies.join(', ')}
          color="from-indigo-400 to-indigo-500"
        />
        <KpiCard
          label="Companies by Intern Count"
          value={kpis.companyInternCount.map(c => `${c.name} (${c.count})`).join(', ')}
          color="from-teal-400 to-teal-500"
        />
      </div>

      {/* PDF Modal */}
      <GeneratePdfModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        kpis={kpis}
        cycle={cycle}
        major={major}
      />
    </div>
  );
}
