import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterCompanyPage from './pages/RegisterCompany';
import CompanyDashboard from './pages/CompanyDashboard';
import StudentDashboard from './pages/StudentDashboard';
import WorkshopsPage from './pages/WorkshopsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register-company" element={<RegisterCompanyPage />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/workshops" element={<WorkshopsPage />} />
        <Route path="/dashboard" element={<CompanyDashboard />} />
    </Routes>
  );
}
export default App;
