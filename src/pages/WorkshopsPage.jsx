import { useState } from 'react';
import { useWorkshops } from '../hooks/useWorkshops';
import WorkshopForm from '../components/WorkshopForm';
import WorkshopList from '../components/WorkshopList';

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
    <div className="workshops-container">
      <h2>Manage Workshops</h2>
      <WorkshopForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editWorkshop={editWorkshop}
      />
      <WorkshopList
        workshops={workshops}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
