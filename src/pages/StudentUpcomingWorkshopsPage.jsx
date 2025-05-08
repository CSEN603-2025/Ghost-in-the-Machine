import React from 'react';
import { useWorkshops } from '../hooks/useWorkshops';
import {WorkshopCard} from '../components/WorkshopCard';

export default function StudentUpcomingWorkshopsPage() {
  const { workshops } = useWorkshops();

  return (
    <div className="workshops-page-container">
      <h2 className="page-title">📆 Upcoming Workshops</h2>
      <p className="page-subtitle">Discover workshops to boost your career skills.</p>
      <div className="workshop-list">
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop.id} workshop={workshop} />
        ))}
      </div>
    </div>
  );
}
