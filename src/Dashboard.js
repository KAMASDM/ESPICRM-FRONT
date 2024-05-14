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

    // Retrieve the active tab from local storage or default to 0
    const initialTab = parseInt(localStorage.getItem('activeTab'), 10) || 0;
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        // Save the active tab index to local storage whenever it changes
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // Ensure the activeTab value is within bounds of tabsConfig array
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
                                color: 'white', // Default tab color
                            },
                            '& .Mui-selected': {
                                color: 'yellow', // Selected tab color
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: 'yellow', // Indicator color for selected tab
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
            <Toolbar /> {/* This is needed to offset the content below the AppBar */}
            <Box component="main" sx={{ padding: 2, marginTop: "14px", width: '100vw' }}>
                {tabsConfig[validTab].component}
            </Box>
        </div>
    );
};

export default Dashboard;
