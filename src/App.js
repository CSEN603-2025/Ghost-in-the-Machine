import { motion } from "framer-motion";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterCompanyPage from './pages/RegisterCompany';
import CompanyDashboard from './pages/CompanyDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ProStudentDashboard from './pages/ProStudentDashboard';
import MyApplicationsPage from './pages/MyApplicationsPage';
import WorkshopsPage from './pages/WorkshopsPage';
import LandingPage from './pages/LandingPage';
import SCADDashboard from './pages/SCADDashboard'; 
import ManageCompanies from './pages/ManageCompanies';
import ManageStudents from './pages/ManageStudents'; 
import StudentUpcomingWorkshopsPage from './pages/StudentUpcomingWorkshopsPage';
import StudentProfile from './pages/StudentProfile';
import VideoCallPage from './pages/VideoCallPage';
import { ToastContainer } from 'react-toastify';
import RegisteredStudents from './pages/RegisteredStudents';
import EditProfilePage from './pages/EditProfilePage';
import InternshipPage from './pages/InternshipPage';
import ApplicationPage from './pages/ApplicationPage';
import InternshipDetailsPage from './pages/InternshipDetailsPage';
import CompanyDetailsPage from './pages/CompanyDetailsPage';
import StudentReportEditor from './pages/StudentReportEditor';
import FinalizedReport from "./pages/FinalizedReport";
import ViewWorkshopDetailsPage from './pages/ViewWorkshopDetailsPage';
import StudentEvaluation from "./pages/StudentEvaluation";
import SCADInternshipsPage from "./pages/SCADInternshipsPage";
import ApplicationDetails from './components/ApplicationDetails';
import InternDetails from './components/InternDetails';
import InternList from './components/InternList';
import ViewAllInternships from './pages/ViewAllInternships';
import ReportsPage from './pages/ReportsPage';
import InternshipGuidelinesPage from './pages/InternshipGuidelinesPage';
import ManageReportsAndEvaluations from './pages/ManageReportsAndEvaluations';
import FacultyDashboardPage from './pages/FacultyDashboardPage';
import EmailClientPage from "./pages/EmailClientPage";
import EvaluationReportsPage from './pages/EvaluationReportsPage';
import ViewedCompaniesPage from './pages/ViewedCompaniesPage';
import ReportsListPage from './pages/ReportsListPage';
import AssessmentsPage from './pages/AssessmentsPage';
import StatsPage from './pages/StatsPage';
import PostsList from './components/PostsList';
import ManageCycle from './pages/ManageCycle';
import NotificationBell from './components/NotificationBell';



function App() {
  const [posts, setPosts] = useState([]);

  return (
    
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<LoginPage />} />
        <Route path="/register-company" element={<RegisterCompanyPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/pro-student-dashboard" element={<ProStudentDashboard />} />
        <Route path="student/my-applications" element={<MyApplicationsPage />} /> {/* New route */}
        <Route path="/workshops" element={<WorkshopsPage />} />
        <Route path="/dashboard" element={<CompanyDashboard />} />
        <Route path="/scad-dashboard" element={<SCADDashboard />} />
        <Route path="/VideoCallPage" element={<VideoCallPage />} />
        <Route path="/manage-companies" element={<ManageCompanies />} />
        <Route path="/faculty/evaluation-reports" element={<EvaluationReportsPage />}/>
        <Route path="/students" element={<ManageStudents />} />
        <Route path="/workshop-details" element={<ViewWorkshopDetailsPage />} />
        <Route path="/students/:id" element={<StudentProfile />} />
        <Route path="/student-upcoming-workshops" element={<StudentUpcomingWorkshopsPage />} />
        <Route path="/registered-students" element={<RegisteredStudents/>} />
        <Route path="/dashboard" element={<CompanyDashboard />} />
        <Route path="/faculty/internship-reports" element={<ReportsListPage />} /> 
        <Route path="student/edit-profile" element={<EditProfilePage />} />
        <Route path="/faculty/statistics" element={<StatsPage />} />
        <Route path="student/internships" element={<InternshipPage />} />
        <Route path="student/apply/:id" element={<ApplicationPage />} />
        <Route path="student/internship/:id" element={<InternshipDetailsPage />} />
        <Route path="/student/company/:companyName" element={<CompanyDetailsPage />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboardPage />} />
        <Route path="student/report" element={<StudentReportEditor />} />
        <Route path="/student/view-report" element={<FinalizedReport />} />
        <Route path="/student/evaluation" element={<StudentEvaluation />} />
        <Route path="student/scad-internships" element={<SCADInternshipsPage />} />
        <Route path="/interns" element={<InternList />} />
        <Route path="/interns/:id" element={<InternDetails />} />
        <Route path="/applications/details/:id" element={<ApplicationDetails />} />
        <Route path="/view-all-internships" element={<ViewAllInternships />} />
        <Route path="student/reports" element={<ReportsPage />} />
        <Route path="student/internship-guidelines" element={<InternshipGuidelinesPage />} />
        <Route path="/email" element={<EmailClientPage />} />  
        <Route path="student/viewed-profile" element={<ViewedCompaniesPage />} />
        <Route path="student/assessment" element={<AssessmentsPage />} />
        <Route path="/evaluations-reports" element={<ManageReportsAndEvaluations />} />
        <Route path="/posts" element={<PostsList posts={posts} setPosts={setPosts} />} />
        <Route path="/manage-internship-cycle" element={<ManageCycle />} />

      </Routes>
      {/* Global notification bell visible on all pages */}
      <NotificationBell />
    </>
   
  );
}

export default App;