
import React, { useState } from 'react';
import { useWorkshops } from '../hooks/useWorkshops';
import WorkshopForm from '../components/WorkshopForm';
import WorkshopList from '../components/WorkshopList';
import { FaChalkboardTeacher, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';



export default function WorkshopsPage({ onNotify }) {
  const { workshops, addWorkshop, deleteWorkshop, updateWorkshop } = useWorkshops();
  const [editWorkshop, setEditWorkshop] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();



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

  // simple client‐side search
  const filteredWorkshops = workshops.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  const detailsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Premium Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden mb-10"
      >
        <motion.button
  whileHover={{ x: -5 }}
  onClick={() => navigate('/scad-dashboard')}
  className="absolute top-6 left-6 z-30 flex items-center text-white hover:underline"
>
  <ArrowLeft className="mr-1 w-5 h-5" /> Back
</motion.button>

        <div className="absolute inset-0 bg-gradient-to-r from-[#00106A] to-[#0038A0] opacity-95"></div>
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Manage Workshops
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-blue-100 max-w-2xl mx-auto mb-8"
            >
              Create, edit, and organize your online workshops with full details.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-md relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-blue-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search workshops..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-blue-300/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 -mt-10 relative z-20 space-y-12">
        {/* Add/Edit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-8"
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

        {/* Workshops List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Workshop List</h2>
          {filteredWorkshops.length > 0 ? (
            <WorkshopList
              workshops={filteredWorkshops}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ) : (
            <div className="text-gray-500 text-center py-12 italic">
              No workshops found. Add one to get started!
            </div>
          )}
        </motion.div>
      </div>

      {/* Details Modal (if needed for your WorkshopList edits) */}
      <AnimatePresence>
        {/* If you have a modal for full workshop details, include it here */}
      </AnimatePresence>
    </div>
  );
}
