import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterCompanyPage from './pages/RegisterCompany';
import CompanyDashboard from './pages/CompanyDashboard';
import StudentDashboard from './pages/StudentDashboard';
import MyApplicationsPage from './pages/MyApplicationsPage';
import WorkshopsPage from './pages/WorkshopsPage';
import LandingPage from './pages/LandingPage';
import { useNotifications } from './hooks/useNotifications';
import SCADDashboard from './pages/SCADDashboard'; 
import ManageCompanies from './pages/ManageCompanies';
import ManageStudents from './pages/ManageStudents'; 
import StudentProfile from './pages/StudentProfile';
import { ToastContainer } from 'react-toastify';
import RegisteredStudents from './pages/RegisteredStudents';
import ApplicationDetails from './components/ApplicationDetails';
import InternDetails from './components/InternDetails';
import InternList from './components/InternList';


function App() {
  const {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    removeNotification
  } = useNotifications();

  return (
    
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/welcome" element={<LoginPage />} />
      <Route path="/register-company" element={<RegisterCompanyPage />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="student/my-applications" element={<MyApplicationsPage />} /> {/* New route */}
      <Route path="/workshops" element={<WorkshopsPage />} />
      <Route path="/dashboard" element={<CompanyDashboard />} />
      <Route path="/scad-dashboard" element={<SCADDashboard />} />
      <Route path="/manage-companies" element={<ManageCompanies />} />
      <Route path="/students" element={<ManageStudents />} />
      <Route path="/students/:id" element={<StudentProfile />} />
      <Route path="/registered-students" element={<RegisteredStudents/>} />
        <Route path="/dashboard" element={<CompanyDashboard />} />
        <Route path="/interns" element={<InternList />} />
          <Route path="/interns/:id" element={<InternDetails />} />
          <Route path="/applications/details/:id" element={<ApplicationDetails />} />
        
    </Routes>
   
  );
}

export default App;