import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import WorkshopsPage from './pages/WorkshopsPage';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterCompanyPage from './pages/RegisterCompany';
import CompanyDashboard from './pages/CompanyDashboard';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register-company" element={<RegisterCompanyPage />} />
        <Route path="/workshops" element={<WorkshopsPage />} />  
        <Route path="/dashboard" element={<CompanyDashboard />} />
      </Routes>
    </Router>
  
        
        
     
  );
}

export default App;
