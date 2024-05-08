import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Button,
  Box
} from "@mui/material";
import EnquiryForm from "./components/Enquiry/EnquiryForm";
import DetailEnquiry from "./DetailEnquiry";
import Assessment from "./Assessment";
import Application from "./Application";
import StudentProfile from "./StudentProfile";
import Login from "./Login";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('authToken') ? 0 : 5);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    setActiveTab(authToken ? 0 : 5); // Automatically redirect to dashboard after login
  }, [authToken]);

  const handleLogin = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    setActiveTab(5); // Redirect to the Login tab
  };

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    localStorage.setItem('activeTab', newValue);
  };

  const tabsConfig = [
    // { label: "Dashboard", component: <EnquiryForm /> },
    { label: "Enquiry", component: <EnquiryForm /> },
    { label: "DetailEnquiry", component: <DetailEnquiry /> },
    { label: "Assessment", component: <Assessment /> },
    { label: "Application", component: <Application /> },
    { label: "Student", component: <StudentProfile /> },
  ];

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            ESPI Dashboard
          </Typography>
          {authToken && (
            <Tabs
              value={activeTab}
              onChange={handleChange}
              aria-label="dashboard tabs"
              sx={{
                '.MuiTab-root': { color: '#fff' }, // Default color
                '.Mui-selected': { color: '#000' } // Active tab color
              }}
            >
              {tabsConfig.map((tab, index) => (
                <Tab label={tab.label} key={index} value={index} />
              ))}
            </Tabs>
          )}
          {authToken && (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box component="main" sx={{ padding: 2, marginTop: "64px" }}>
        {authToken ? tabsConfig[activeTab].component : <Login onLogin={handleLogin} />}
      </Box>
    </div>
  );
};

export default Dashboard;
