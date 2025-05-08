import { WorkshopCard }from './WorkshopCard';

export default function WorkshopList({ workshops, onDelete, onEdit }) {
  return (
    <div className="workshop-list">
      {workshops.map(workshop => (
        <WorkshopCard
          key={workshop.id}
          workshop={workshop}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
