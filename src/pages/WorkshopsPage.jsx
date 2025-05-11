import { useState } from 'react';
import { useWorkshops } from '../hooks/useWorkshops';
import WorkshopForm from '../components/WorkshopForm';
import WorkshopList from '../components/WorkshopList';
import { FaChalkboardTeacher } from 'react-icons/fa';

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
    <div className="p-6">

      {/* Top Blue Bar */}
      <div className="h-2 bg-indigo-600 rounded-t-lg mb-6"></div>

      {/* Header */}
      <div className="flex items-center mb-6">
        <FaChalkboardTeacher className="text-indigo-600 text-3xl mr-3" />
        <h2 className="text-3xl font-semibold text-gray-800">Manage Workshops</h2>
      </div>

      {/* Workshop Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8 transition-all duration-300">
        <h3 className="text-xl font-medium text-gray-700 mb-4">
          {editWorkshop ? 'Edit Workshop' : 'Add New Workshop'}
        </h3>
        <WorkshopForm
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editWorkshop={editWorkshop}
        />
      </div>

      {/* Workshop List */}
      <div className="bg-white rounded-lg shadow p-6 transition-all duration-300">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Workshop List</h3>
        {workshops.length > 0 ? (
          <WorkshopList
            workshops={workshops}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ) : (
          <div className="text-gray-500 text-center py-8 italic">
            No workshops available. Add one to get started!
          </div>
        )}
      </div>
    </div>
  );
}
