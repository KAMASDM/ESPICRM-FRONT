import React, {useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import EnquiryForm from "./EnquiryForm";
import BarChart from "./BarChart";
import NotesWidget from "./NotesWidget";
import DetailEnquiry from "./DetailEnquiry";
import StudentProfile from "./StudentProfile";
import Assessment from "./Assessment";
import Application from "./Application";

//import Payments from "./Payments";
import { Payments } from "@mui/icons-material";


// Dashboard component is the main container for the application's interface.
const Dashboard = () => {
  // State for tracking the active tab index.
  const [activeTab, setActiveTab] = useState(
    parseInt(localStorage.getItem('activeTab'), 10) || 0
  );

  // Function to handle changing tabs.
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    localStorage.setItem('activeTab', newValue); // Save new tab index to localStorage
  };

  // Configuration for the tabs in the dashboard. Each tab is associated with a component.
  const tabsConfig = [
    { label: "Dashboard", component: <DashboardContent /> },
    { label: "Enquiry", component: <EnquiryForm /> },
    { label: "DetailEnquiry", component: <DetailEnquiry /> },
    { label: "Assessment", component: <Assessment /> },
    { label: "Application", component: <Application /> },
    { label: "Payment", component: <Payments /> },
    { label: "Students", component: <StudentProfile /> },
   
    
    // More tabs can be added here as needed.
  ];

  return (
    <div style={{ flexGrow: 1 }}>
      {/* AppBar for the top menu with the title and tab navigation */}
      
      
        
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            ESPI Dashboard
          </Typography>
          <Tabs
            value={activeTab.toFixed(0)}
            onChange={handleChange}
            aria-label="dashboard tabs"
            sx={{
              '.MuiTab-root': { color: '#fff' }, // Default color
              '.Mui-selected': { color: 'red' }, // Active tab color
            }}
            TabIndicatorProps={{ style: { background: '#4caf50' } }}
          >
            {tabsConfig.map((tab, index) => (
              <Tab label={tab.label} key={index} value={index}/>
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
     

      {/* Placeholder Toolbar component to ensure content is not hidden under the AppBar */}
      <Toolbar />

      {/* Main content area where the selected tab's component will be rendered */}
      <main style={{ padding: 2, marginTop: "14px", color:"black" }}>
        {tabsConfig[activeTab].component}
      </main>
    </div>
  );
};

// Helper component to render the content of the "Dashboard" tab.
const DashboardContent = () => (
  <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0.5}>
      <Grid item xs={12} sm={5}>
        <StyledCard>
          <CardContent>
            <BarChart />
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} sm={4}>
        <StyledCard>
          <CardContent>
            <NotesWidget />
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  </Box>
);

// StyledCard component to avoid repeating styles for Cards.
const StyledCard = ({ children }) => (
  <Card
    sx={{
      borderColor: "primary.main",
      borderWidth: "1px",
      borderStyle: "solid",
      backgroundColor: "#f9f9f9",
      boxShadow: 3,
      activeTab: 0,
    }}
  >
    {children}
  </Card>
);

export default Dashboard;
