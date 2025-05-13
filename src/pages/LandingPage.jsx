import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import { useNotifications } from '../contexts/NotificationContext';

const LandingPage = () => {
  const { clearNotifications } = useNotifications();
  useEffect(() => {
    clearNotifications();
  }, [clearNotifications]);

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
    </>
  );
};

export default LandingPage;
