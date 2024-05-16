import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {}, [authToken]);

  const handleLogin = (token) => {
    console.log("Setting auth token:", token);
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    setAuthToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            authToken ? (
              <Navigate to="/Dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/Dashboard"
          element={
            authToken ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/"
          element={
            <Navigate to={authToken ? "/Dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
