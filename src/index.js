import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './input.css';
import './index.css';
import { ApplicationsProvider } from './contexts/ApplicationsContext';
import { NotificationProvider } from './contexts/NotificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ApplicationsProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </ApplicationsProvider>
  </BrowserRouter>
);