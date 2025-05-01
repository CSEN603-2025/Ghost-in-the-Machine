import { useWorkshops } from '../hooks/useWorkshops';
import WorkshopForm from '../components/WorkshopForm';
import WorkshopList from '../components/WorkshopList';

export default function WorkshopsPage() {
  const { workshops, addWorkshop, deleteWorkshop } = useWorkshops();

  return (
    <div className="workshops-container">
      <h2>Manage Workshops</h2>
      <WorkshopForm onAdd={addWorkshop} />
      <WorkshopList workshops={workshops} onDelete={deleteWorkshop} />
    </div>
  );
}
