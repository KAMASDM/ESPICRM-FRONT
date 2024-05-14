// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./Dashboard";
import Login from "./Login";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  // your theme setup
});

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    console.log("Auth token updated:", authToken);
  }, [authToken]);

  const handleLogin = (token) => {
    console.log("Setting auth token:", token);
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken'); // Clear refresh token as well
    setAuthToken(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={authToken ? <Navigate to="/Dashboard" replace /> : <Login onLogin={handleLogin} />} />
          <Route path="/Dashboard" element={authToken ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
          <Route path="/" element={<Navigate to={authToken ? "/Dashboard" : "/login"} replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
