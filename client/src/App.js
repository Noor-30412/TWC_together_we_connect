// App.js
import './App.css';
import React from 'react';
import AppRoutes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {/* Add the viewport meta tag here */}
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
