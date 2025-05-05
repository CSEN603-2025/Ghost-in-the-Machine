export default function WorkshopList({ workshops, onDelete, onEdit }) {
    return (
      <div className="workshop-list">
        {workshops.map(workshop => (
          <div className="workshop-item" key={workshop.id}>
            <h3>{workshop.name}</h3>
            <p><strong>Speaker:</strong> {workshop.speaker}</p>
            <p><strong>Date:</strong> {workshop.date}</p>
            <p><strong>Description:</strong> {workshop.description}</p>
            <button onClick={() => onEdit(workshop)}>Edit</button>
            <button onClick={() => onDelete(workshop.id)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }
  