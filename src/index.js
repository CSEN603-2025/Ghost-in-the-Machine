// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './input.css';
import './index.css';
import { ApplicationsProvider } from './contexts/ApplicationsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApplicationsProvider>
      <App />
    </ApplicationsProvider>
  </React.StrictMode>
);