import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainActionButton from './MainActionButton';

const ReportsNavbar = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#00106A] py-6 px-6 flex items-center justify-between">
      <MainActionButton variant="primary" onClick={() => navigate('/') }>
        Home
      </MainActionButton>
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <MainActionButton variant="danger" onClick={() => navigate('/welcome') }>
        Logout
      </MainActionButton>
    </div>
  );
};

export default ReportsNavbar;
