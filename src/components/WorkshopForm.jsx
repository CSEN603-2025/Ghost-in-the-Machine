import { useState, useEffect } from 'react';

export default function WorkshopForm({ onAdd, onUpdate, editWorkshop }) {
  const [formData, setFormData] = useState({
    name: '', speaker: '', date: '', description: ''
  });

  useEffect(() => {
    if (editWorkshop) {
      setFormData(editWorkshop);
    }
  }, [editWorkshop]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editWorkshop) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
    setFormData({ name: '', speaker: '', date: '', description: '' });
  };

  return (
    <form className="workshop-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Workshop Name" value={formData.name} onChange={handleChange} required />
      <input name="speaker" placeholder="Speaker" value={formData.speaker} onChange={handleChange} required />
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <button type="submit">{editWorkshop ? "Update Workshop" : "Add Workshop"}</button>
    </form>
  );
}
