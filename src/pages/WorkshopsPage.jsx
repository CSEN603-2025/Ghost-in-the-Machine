import React, { useState, useEffect } from 'react';
import { useWorkshops } from '../hooks/useWorkshops';
import WorkshopForm from '../components/WorkshopForm';
import WorkshopList from '../components/WorkshopList';
import { FaChalkboardTeacher, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function WorkshopsPage() {
  const { workshops, addWorkshop, deleteWorkshop, updateWorkshop } = useWorkshops();
  const [editWorkshop, setEditWorkshop] = useState(null);
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState(null); // { message: string, type: 'success'|'error'|'info' }
  const navigate = useNavigate();

  // Hide notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const notify = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const handleAdd = (workshop) => {
    addWorkshop(workshop);
    notify(`Workshop "${workshop.name}" added!`, 'success');
  };

  const handleUpdate = (workshop) => {
    updateWorkshop(workshop);
    notify(`Workshop "${workshop.name}" updated!`, 'success');
    setEditWorkshop(null);
  };

  const handleDelete = (id) => {
    deleteWorkshop(id);
    notify(`Workshop deleted!`, 'error');
  };

  const handleEdit = (workshop) => {
    setEditWorkshop(workshop);
    document.getElementById('workshop-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditWorkshop(null);
  };

  const filteredWorkshops = workshops.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative">

      {/* Notification Banner */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white z-50
            ${
              notification.type === 'success' ? 'bg-green-600' :
              notification.type === 'error' ? 'bg-red-600' :
              'bg-blue-600'
            }
          `}
          role="alert"
        >
          {notification.message}
        </motion.div>
      )}

      {/* Hero Section */}
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
          id="workshop-form-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-white rounded-xl shadow-xl ${
            editWorkshop ? 'border-2 border-blue-500 ring-4 ring-blue-100' : 'border border-gray-300'
          } p-8 relative transition-all duration-300`}
        >
          {editWorkshop && (
            <div className="absolute -top-3 left-6 bg-blue-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center">
              <FaChalkboardTeacher className="mr-2" />
              EDITING: {editWorkshop.name.toUpperCase()}
            </div>
          )}
          
          <h2 className={`text-3xl font-bold ${
            editWorkshop ? 'text-blue-700' : 'text-gray-800'
          } mb-8 flex items-center`}>
            {editWorkshop ? (
              <>
                <svg className="w-7 h-7 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Workshop
              </>
            ) : (
              <>
                <svg className="w-7 h-7 mr-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Workshop
              </>
            )}
          </h2>
          
          {/* Wrap WorkshopForm in a div with better visibility styles */}
          <div className="text-gray-800 bg-gray-50 p-6 rounded-lg border border-gray-300 shadow-sm space-y-4">
            <WorkshopForm
              onAdd={handleAdd}
              onUpdate={handleUpdate}
              editWorkshop={editWorkshop}
              onCancel={editWorkshop ? handleCancelEdit : null}
            />
          </div>
        </motion.div>

        {/* Workshops List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-300 p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Workshop List</h2>
          {filteredWorkshops.length > 0 ? (
            <WorkshopList
              workshops={filteredWorkshops}
              onDelete={handleDelete}
              onEdit={handleEdit}
              editingId={editWorkshop?._id}
            />
          ) : (
            <div className="text-gray-500 text-center py-12 italic">
              No workshops found. Add one to get started!
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
