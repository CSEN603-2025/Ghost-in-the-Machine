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
import ApplicationDetails from './components/ApplicationDetails';
import ApplicationListPage from './components/ApplicationListPage';
 import InternList from './components/InternList';
 import InternDetails from './components/InternDetails';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/welcome" element={<LoginPage />} />
      <Route path="/register-company" element={<RegisterCompanyPage />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="student/my-applications" element={<MyApplicationsPage />} /> {/* New route */}
      <Route path="/workshops" element={<WorkshopsPage />} />
        <Route path="/dashboard" element={<CompanyDashboard />} />
        <Route path="/applications/details/:id" element={<ApplicationDetails />} />
        <Route path="/applications/:postId" element={<ApplicationListPage />} />
       <Route path="/interns" element={<InternList />} />
       <Route path="/interns/:id" element={<InternDetails />} />
    </Routes>
  );
}

export default App;
