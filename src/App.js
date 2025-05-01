import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterCompanyPage from './pages/RegisterCompany';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register-company" element={<RegisterCompanyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
