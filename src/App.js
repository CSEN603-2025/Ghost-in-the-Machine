import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterCompanyPage from './pages/RegisterCompany';
import StudentDashboard from './pages/StudentDashboard';
import WorkshopsPage from './pages/WorkshopsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register-company" element={<RegisterCompanyPage />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/workshops" element={<WorkshopsPage />} />
    </Routes>
  );
}
export default App;
