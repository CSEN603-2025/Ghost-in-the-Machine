import React from 'react';
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard"; 






function App() {
  return (
    <Routes>
      <Route path="/student/dashboard" element={<StudentDashboard />} />
    </Routes>
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import WorkshopsPage from './pages/WorkshopsPage';  // <-- import your new page
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterCompanyPage from './pages/RegisterCompany';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/register-company" element={<RegisterCompanyPage />} />
        <Route path="/workshops" element={<WorkshopsPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
