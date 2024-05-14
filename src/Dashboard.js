// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Button, Box } from '@mui/material';
import EnquiryForm from './components/Enquiry/EnquiryForm';
import DetailEnquiry from './DetailEnquiry';
import Assessment from './Assessment';
import Application from './Application';
import StudentProfile from './StudentProfile';

const Dashboard = ({ onLogout }) => {
  const tabsConfig = [
    { label: "Dashboard", component: <EnquiryForm /> },
    { label: "Enquiry", component: <EnquiryForm /> },
    { label: "DetailEnquiry", component: <DetailEnquiry /> },
    { label: "Assessment", component: <Assessment /> },
    { label: "Application", component: <Application /> },
    { label: "Student Profile", component: <StudentProfile /> },
  ];

  const initialTab = parseInt(localStorage.getItem('activeTab'), 10) || 0;
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const validTab = activeTab >= 0 && activeTab < tabsConfig.length ? activeTab : 0;

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ESPI Dashboard
          </Typography>
          <Tabs
            value={validTab}
            onChange={handleChange}
            aria-label="dashboard tabs"
            sx={{
              '& .MuiTab-root': {
                color: 'white',
              },
              '& .Mui-selected': {
                color: 'yellow !important',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'yellow',
              },
            }}
          >
            {tabsConfig.map((tab, index) => (
              <Tab label={tab.label} key={index} />
            ))}
          </Tabs>
          <Button color="inherit" onClick={onLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box component="main" sx={{ padding: 2, marginTop: "64px", width: '100vw' }}>
        {tabsConfig[validTab].component}
      </Box>
    </div>
  );
};

export default Dashboard;
