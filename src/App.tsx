import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import AddPill from './pages/AddPill/AddPill';
import DeletePill from './pages/DeletePill/DeletePill';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // State indicating authentication

  useEffect(() => {
    if (!isAuthenticated) {
      const password = prompt("Ingresar contraseña:"); // Prompt for password
      if (password === import.meta.env.VITE_APP_PASSWORD) {
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
          <Route path="/" element={<AddPill />} />
          <Route path="/delete" element={<DeletePill />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
