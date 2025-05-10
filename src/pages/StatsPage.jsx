import React, { useState } from 'react';
import { FaChartBar, FaDownload, FaCalendarAlt, FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import KpiCard from '../components/KpiCard';
import StatsFilters from '../components/StatsFilters';
import ExportCsvDropdown from '../components/ExportCsvDropdown';
import GeneratePdfModal from '../components/GeneratePdfModal';

const StatsPage = () => {
  const [cycle, setCycle] = useState({ start: '2025-01-01', end: '2025-06-30' });
  const [major, setMajor] = useState('');
  const [showPdf, setShowPdf] = useState(false);
  const kpis = {
    accepted: 12, rejected: 4, flagged: 3,
    avgReviewTime: '2.4 days',
    topCourses: ['CS101','GD202','EE301'],
    topCompanies: ['TechCorp','DesignCo','InnoSoft'],
    companyInternCount: [{name:'TechCorp',count:8},{name:'DesignCo',count:5}]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95" />
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center text-white">
          <FaChartBar size={48} className="mx-auto mb-4" />
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-2">Analytics Dashboard</motion.h1>
          <motion.p className="text-xl max-w-2xl mx-auto mb-8 text-blue-100">
            Monitor real-time KPIs, filter by cycle/major, and export your data.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </motion.div>

      {/* Toolbar */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
        className="max-w-7xl mx-auto px-6 py-6 -mt-12 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-wrap items-center justify-between gap-4"
      >
        <StatsFilters cycle={cycle} onCycleChange={setCycle} major={major} onMajorChange={setMajor} />
        <div className="flex space-x-3">
          <ExportCsvDropdown kpis={kpis} cycle={cycle} major={major} />
          <motion.button whileHover={{scale:1.05}} onClick={()=>setShowPdf(true)}
            className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] text-black px-4 py-2 rounded-lg shadow">
            <FaDownload className="inline mr-2"/>Generate PDF
          </motion.button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <KpiCard label="Accepted" value={kpis.accepted} color="from-green-400 to-green-500" />
        <KpiCard label="Rejected" value={kpis.rejected} color="from-red-400 to-red-500" />
        <KpiCard label="Flagged" value={kpis.flagged} color="from-yellow-400 to-yellow-500" />
        <KpiCard label="Avg Review Time" value={kpis.avgReviewTime} color="from-blue-400 to-blue-500" />
        <KpiCard label="Top Courses" value={kpis.topCourses.join(', ')} color="from-purple-400 to-purple-500" />
        <KpiCard label="Top Companies" value={kpis.topCompanies.join(', ')} color="from-indigo-400 to-indigo-500" />
        <KpiCard
          label="Intern Count"
          value={kpis.companyInternCount.map(c => `${c.name}(${c.count})`).join(', ')}
          color="from-teal-400 to-teal-500"
        />
      </div>

      <GeneratePdfModal
        isOpen={showPdf} onClose={()=>setShowPdf(false)}
        kpis={kpis} cycle={cycle} major={major}
      />
    </div>
  );
};

export default StatsPage;
