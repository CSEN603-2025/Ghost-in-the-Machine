import { useState } from 'react';

export default function WorkshopForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '', speaker: '', date: '', description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', speaker: '', date: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Workshop Name" value={formData.name} onChange={handleChange} required />
      <input name="speaker" placeholder="Speaker" value={formData.speaker} onChange={handleChange} required />
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <button type="submit">Add Workshop</button>
    </form>
  );
}
