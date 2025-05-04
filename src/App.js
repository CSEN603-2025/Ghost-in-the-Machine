import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterCompanyPage from './pages/RegisterCompany';
import CompanyDashboard from './pages/CompanyDashboard';
import StudentDashboard from './pages/StudentDashboard';
import MyApplicationsPage from './pages/MyApplicationsPage';
import WorkshopsPage from './pages/WorkshopsPage';
import LandingPage from './pages/LandingPage';
import ApplicationListPage from './components/ApplicationListPage';
import InternList from './components/InternList';
import InternDetails from './components/InternDetails';
import { useNotifications } from './hooks/useNotifications';
import NotificationBell from './components/NotificationBell';
import ApplicationDetails from './components/ApplicationDetails';
import VideoCallPage from './pages/VideoCallPage';
import SCADDashboard from './pages/SCADDashboard';
import ManageCompanies from './pages/ManageCompanies';
import ManageStudents from './pages/ManageStudents'; 
import StudentProfile from './pages/StudentProfile';

function App() {
  const {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    removeNotification
  } = useNotifications();

  return (
    <Router>
      <div className="app-shell">
        <NotificationBell
          notifications={notifications}
          unreadCount={unreadCount}
          markAsRead={markAsRead}
          removeNotification={removeNotification}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/welcome" element={<LoginPage />} />
          <Route path="/register-company" element={<RegisterCompanyPage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-applications" element={<MyApplicationsPage />} />
          <Route path="/video-call" element={<VideoCallPage />} />
          <Route path="student/my-applications" element={<MyApplicationsPage />} />
          <Route
            path="/workshops"
            element={
              <WorkshopsPage onNotify={(msg, type) => addNotification(msg, type)} />
            }
          />
        <Route path="/dashboard" element={<CompanyDashboard />} />
        <Route path="/applications/:postId" element={<ApplicationListPage />} />
          <Route path="/interns" element={<InternList />} />
          <Route path="/interns/:id" element={<InternDetails />} />
          <Route path="/applications/details/:id" element={<ApplicationDetails />} />
          <Route path="/scad-dashboard" element={<SCADDashboard />} />
          <Route path="/manage-companies" element={<ManageCompanies />} />
          <Route path="/students" element={<ManageStudents />} />
        <Route path="/students/:id" element={<StudentProfile />} />
    </Routes>
      </div>
    </Router>
  );
}

export default App;