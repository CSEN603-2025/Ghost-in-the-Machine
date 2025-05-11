import React from 'react';
import { FaEdit, FaTrash, FaClock, FaUser } from 'react-icons/fa';

export default function WorkshopList({ workshops, onDelete, onEdit }) {
  return (
    <div className="space-y-4">
      {workshops.map(ws => (
        <div
          key={ws.id}
          className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="h-2 w-full bg-indigo-600" />
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-2">
              <h4 className="text-xl font-bold text-gray-800">{ws.name}</h4>
              <p className="text-gray-600">{ws.shortDesc}</p>

              <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
                <span className="flex items-center">
                  <FaClock className="mr-1" />
                  {new Date(ws.startDateTime).toLocaleString()} — {new Date(ws.endDateTime).toLocaleString()}
                </span>
                <span className="flex items-center">
                  <FaUser className="mr-1" />
                  Speaker Bio:
                </span>
              </div>

              <p className="text-gray-600 italic bg-gray-50 p-2 rounded">{ws.speakerBio}</p>

              <h5 className="font-semibold text-gray-700">Agenda</h5>
              <p className="text-gray-600 whitespace-pre-wrap">{ws.agenda}</p>
            </div>


            {/* Right: Actions */}
            <div className="flex flex-col items-end justify-between">
              <div className="space-x-2">
                <button
                  onClick={() => onEdit(ws)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => onDelete(ws.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

}
