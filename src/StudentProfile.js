import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Box, Container, Button,Card,CardContent} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Components
import DetailEnquiry from "./DetailEnquiry";
import Assessment from "./Assessment";
import Application from "./Application";
import NotesWidget from './NotesWidget';

// Placeholder Components
// You need to create these components or replace with actual ones
//const Applications = () => <Typography variant="body1">Application Form</Typography>;
const Payment = () => <Typography variant="body1">Payment Details</Typography>;

const StudentProfile = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const renderTabPanel = (index) => {
    switch (index) {
      case 0:
        return <DetailEnquiry />;
      case 1:
        return <Assessment />;
      case 2:
        return <Application />;
      case 3:
        return <Payment />;
      case 4:
        return <NotesWidget />;
      default:
        return <Box>Unknown Tab Index: {index}</Box>;
    }
  };

  return (
    <Container>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Student Profile
          </Typography>
          <Button variant="contained" startIcon={<CheckCircleOutlineIcon />}>
            Verify Profile
          </Button>
        </Toolbar>
      </AppBar>
      <Card>
        <CardContent>
      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="student profile tabs" >
        <Tab label="Detail Enquiry" />
        <Tab label="Assessment" />
        <Tab label="Application" />
        <Tab label="Payment" />
        <Tab label="Notes" />
      </Tabs>
      </CardContent>
      </Card>
      <Box sx={{ p: 3 }}>
        {renderTabPanel(selectedTab)}
      </Box>
    </Container>
  );
};

export default StudentProfile;