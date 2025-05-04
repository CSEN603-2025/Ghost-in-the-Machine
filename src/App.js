import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterCompanyPage from './pages/RegisterCompany';
import CompanyDashboard from './pages/CompanyDashboard';
import StudentDashboard from './pages/StudentDashboard';
import MyApplicationsPage from './pages/MyApplicationsPage'; // New page for My Applications
import WorkshopsPage from './pages/WorkshopsPage';
import LandingPage from "./pages/LandingPage"; // adjust path if needed
import EditProfilePage from './pages/EditProfilePage';
import InternshipDetailsPage from "./pages/InternshipDetailsPage";
import InternshipPage from "./pages/InternshipPage";
import ApplicationPage from "./pages/ApplicationPage";  
import CompanyDetailsPage from "./pages/CompanyDetailsPage";




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
      <Route path="student/edit-profile" element={<EditProfilePage />} />
      <Route path="student/internship/:id" element={<InternshipDetailsPage />} />
      <Route path="student/internships" element={<InternshipPage />} /> 
      <Route path="student/apply/:id" element={<ApplicationPage />} />
      <Route path="student/company/:companyName" element={<CompanyDetailsPage />} />



    </Routes>
   
  );
}

export default App;
