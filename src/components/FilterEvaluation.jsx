import React, { useState } from 'react';

export default function FilterEvaluation({ onFilter }) {
  const [company, setCompany] = useState('');
  const [supervisor, setSupervisor] = useState('');

  const handleFilter = () => {
    onFilter({ company, supervisor });
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Company</label>
        <input
          type="text"
          value={company}
          onChange={e => setCompany(e.target.value)}
          placeholder="All companies"
          className="mt-1 block w-48 rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#00106A] focus:ring focus:ring-[#00106A]/50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Supervisor</label>
        <input
          type="text"
          value={supervisor}
          onChange={e => setSupervisor(e.target.value)}
          placeholder="All supervisors"
          className="mt-1 block w-48 rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#00106A] focus:ring focus:ring-[#00106A]/50"
        />
      </div>
      <div className="flex items-end">
        <button
          onClick={handleFilter}
          className="bg-gradient-to-r from-[#00F0B5] to-[#00D6A0] hover:from-[#00D6A0] hover:to-[#00F0B5] text-black font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
        >
          Filter
        </button>
      </div>
    </div>
  );
}
