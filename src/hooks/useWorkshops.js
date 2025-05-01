import { useState } from 'react';

export const useWorkshops = () => {
  const [workshops, setWorkshops] = useState([
    { id: 1, name: "CV Masterclass", speaker: "Dr. Smith", date: "2025-05-20", description: "Learn how to make your CV stand out." },
    { id: 2, name: "Interview Skills", speaker: "Ms. Johnson", date: "2025-05-23", description: "Ace your internship interviews." }
  ]);

  const addWorkshop = (workshop) => {
    setWorkshops(prev => [...prev, { ...workshop, id: Date.now() }]);
  };

  const deleteWorkshop = (id) => {
    setWorkshops(prev => prev.filter(w => w.id !== id));
  };

  return { workshops, addWorkshop, deleteWorkshop };
};
