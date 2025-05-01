import { useState } from 'react';
import { useWorkshops } from '../hooks/useWorkshops';
import WorkshopForm from '../components/WorkshopForm';
import WorkshopList from '../components/WorkshopList';

export default function WorkshopsPage() {
  const { workshops, addWorkshop, deleteWorkshop, updateWorkshop } = useWorkshops();
  const [editWorkshop, setEditWorkshop] = useState(null);

  const handleEdit = (workshop) => {
    setEditWorkshop(workshop);
  };

  const handleUpdate = (updatedWorkshop) => {
    updateWorkshop(updatedWorkshop);
    setEditWorkshop(null);
  };

  return (
    <div className="workshops-container">
      <h2>Manage Workshops</h2>
      <WorkshopForm
        onAdd={addWorkshop}
        onUpdate={handleUpdate}
        editWorkshop={editWorkshop}
      />
      <WorkshopList
        workshops={workshops}
        onDelete={deleteWorkshop}
        onEdit={handleEdit}
      />
    </div>
  );
}
