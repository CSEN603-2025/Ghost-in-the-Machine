import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import WorkshopsPage from './pages/WorkshopsPage';  // <-- import your new page
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterCompanyPage from './pages/RegisterCompany';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register-company" element={<RegisterCompanyPage />} />
        <Route path="/workshops" element={<WorkshopsPage />} />  
      </Routes>
    </Router>
  
        
        
     
  );
}

export default App;
