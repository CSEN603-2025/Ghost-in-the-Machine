// src/components/StatsFilters.jsx
import React from 'react';

export default function StatsFilters({ cycle, onCycleChange, major, onMajorChange }) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Cycle Start */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Cycle Start</label>
        <input
          type="date"
          value={cycle.start}
          onChange={e => onCycleChange({ ...cycle, start: e.target.value })}
          className="mt-1 rounded-md border-gray-300 p-2"
        />
      </div>

      {/* Cycle End */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Cycle End</label>
        <input
          type="date"
          value={cycle.end}
          onChange={e => onCycleChange({ ...cycle, end: e.target.value })}
          className="mt-1 rounded-md border-gray-300 p-2"
        />
      </div>

      {/* Major Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Major</label>
        <select
          value={major}
          onChange={e => onMajorChange(e.target.value)}
          className="mt-1 rounded-md border-gray-300 p-2"
        >
          <option value="">All Majors</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
        </select>
      </div>
    </div>
  );
}
