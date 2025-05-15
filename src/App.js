import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { ApplicationsProvider } from './context/ApplicationsContext';
import './styles/App.css';

const App = () => {
  return (
    <ApplicationsProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ApplicationsProvider>
  );
};

export default App;
