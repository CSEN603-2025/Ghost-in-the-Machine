import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterCompanyPage from './pages/RegisterCompany';
import CompanyDashboard from './pages/CompanyDashboard';
import StudentDashboard from './pages/StudentDashboard';
import MyApplicationsPage from './pages/MyApplicationsPage'; // New page for My Applications
import WorkshopsPage from './pages/WorkshopsPage';
import LandingPage from './pages/LandingPage'; 

import ApplicationListPage from './components/ApplicationListPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/welcome" element={<LoginPage />} />
      <Route path="/register-company" element={<RegisterCompanyPage />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/student-applications" element={<MyApplicationsPage />} /> {/* New route */}
      <Route path="/workshops" element={<WorkshopsPage />} />
      <Route path="/company-dashboard" element={<CompanyDashboard />} />
      <Route path="/applications/:postId" element={<ApplicationListPage />} />
     
    </Routes>
  );
}

export default App;
