import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import WorkshopsPage from './pages/WorkshopsPage';  // <-- import your new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/workshops" element={<WorkshopsPage />} />  {/* <-- new route */}
      </Routes>
    </Router>
  );
}

export default App;
