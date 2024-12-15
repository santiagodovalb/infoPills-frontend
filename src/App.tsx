import React, { useEffect, useState } from 'react';
import './App.css';
import AddPill from './pages/AddPill/AddPill';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import Pills from './pages/Pills/Pills';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // State indicating authentication

  useEffect(() => {
    const storedPassword = localStorage.getItem('password');
    if (storedPassword === import.meta.env.VITE_APP_PASSWORD) {
      setIsAuthenticated(true);
      return;
    }
    if (!isAuthenticated) {
      const password = prompt("Ingresar contraseña:"); // Prompt for password
      if (password === import.meta.env.VITE_APP_PASSWORD) {
        if (password) localStorage.setItem('password', password);
        setIsAuthenticated(true);
      } else {
        alert("Incorrect password!");
        setIsAuthenticated(false);
      }
    }
  }, [isAuthenticated]); // Only run once on first render

  if (!isAuthenticated) {
    return (
      <div>
        <h2>Accesso denegado</h2>
        <p>Ingresá la contraseña nuevamente</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for adding a pill */}
          <Route path="/" element={<Pills />} />

          {/* Route for listing pills */}
          <Route path="/add" element={<AddPill />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
