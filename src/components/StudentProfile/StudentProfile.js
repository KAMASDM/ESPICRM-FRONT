import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  Container,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DetailEnquiry from "../DetailEnquiry/DetailEnquiry";
import Assessment from "../Assessment/Assessment";
import Application from "../Application/Application";
import NotesWidget from "../Notes/Notes";

const Payment = () => <Typography variant="body1">Payment Details</Typography>;

const StudentProfile = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (newValue) => {
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
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="student profile tabs"
          >
            <Tab label="Detail Enquiry" />
            <Tab label="Assessment" />
            <Tab label="Application" />
            <Tab label="Payment" />
            <Tab label="Notes" />
          </Tabs>
        </CardContent>
      </Card>
      <Box sx={{ p: 3 }}>{renderTabPanel(selectedTab)}</Box>
    </Container>
  );
};

export default StudentProfile;
