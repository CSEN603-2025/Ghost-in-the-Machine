import React from 'react';
import { motion } from 'framer-motion';

export default function KpiCard({ label, value, color }) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition h-40 flex flex-col`}
    >
      <div className={`h-2 w-full bg-gradient-to-r ${color}`}></div>
      <div className="p-6 flex-1 flex flex-col justify-center">
        <h3 className="text-gray-500">{label}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </motion.div>
  );
}
