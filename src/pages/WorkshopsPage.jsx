import { useState } from 'react';
import { useWorkshops } from '../hooks/useWorkshops';
import WorkshopForm from '../components/WorkshopForm';
import WorkshopList from '../components/WorkshopList';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function WorkshopsPage({ onNotify }) {
  const { workshops, addWorkshop, deleteWorkshop, updateWorkshop } = useWorkshops();
  const [editWorkshop, setEditWorkshop] = useState(null);

  const handleAdd = (workshop) => {
    addWorkshop(workshop);
    if (onNotify) onNotify(`Workshop "${workshop.name}" added!`, 'success');
  };

  const handleUpdate = (workshop) => {
    updateWorkshop(workshop);
    if (onNotify) onNotify(`Workshop "${workshop.name}" updated!`, 'info');
    setEditWorkshop(null);
  };

  const handleDelete = (id) => {
    deleteWorkshop(id);
    if (onNotify) onNotify(`Workshop deleted!`, 'error');
  };

  const handleEdit = (workshop) => {
    setEditWorkshop(workshop);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-indigo-600 text-white py-16 mb-10 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center space-x-4">
            <FaChalkboardTeacher className="text-5xl" />
            <div>
              <h1 className="text-4xl font-bold">Manage Workshops</h1>
              <p className="mt-2 text-indigo-200">Create, edit, and organize your online workshops with full details.</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Workshop Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {editWorkshop ? 'Edit Workshop' : 'Add New Workshop'}
          </h2>
          <WorkshopForm
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            editWorkshop={editWorkshop}
          />
        </motion.div>

        {/* Workshop List Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Workshop List</h2>
          {workshops.length > 0 ? (
            <WorkshopList
              workshops={workshops}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ) : (
            <div className="text-gray-500 text-center py-12 italic">
              No workshops available. Add one to get started!
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
