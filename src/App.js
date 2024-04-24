import logo from './logo.svg';
import './App.css';
import styled from '@mui/material/styles/styled';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';// Theme CSS
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from "./Dashboard";
import EnquiryForm from './EnquiryForm';
import { createTheme, ThemeProvider, CssBaseline,Typography } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6', // Example: a nice shade of blue
    },
    // Adjust secondary, error, and other colors as needed
    secondary: {
      main: '#19857b',
    },
    typography: {
      // Set the default font family, size, etc.
      fontFamily: 'Roboto, Arial, sans-serif',
      fontSize: 14, // Default font size for the body
      h1: {
        fontSize: '0.5rem', // Font size for <Typography variant="h1" />
      },
      h2: {
        fontSize: '2.0rem',
      },
      body1: {
        fontSize: '1rem', // Example of changing the body1 variant size
      },
      button: {
        fontSize: '0.875rem', // Example for buttons
      },
    }
  },
  // You can also customize typography, breakpoints, etc.
});



function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
    <Router>
    <div className="App">
     
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
      </Routes>
    </div>
  </Router>
 
  </ThemeProvider>
  );
}

export default App;



