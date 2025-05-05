import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 🛠 Move this up here
import App from './App';
import './input.css';
import './index.css';
import { ApplicationsProvider } from './contexts/ApplicationsContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApplicationsProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
   </ApplicationsProvider>
);