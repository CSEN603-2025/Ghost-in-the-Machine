import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';

const LandingPage = () => {
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
