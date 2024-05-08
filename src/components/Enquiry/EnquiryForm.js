import React, { useState } from "react";
import { Container, Grid, Card, CardContent, Button, Stepper, Step, StepLabel, Typography, Box } from "@mui/material";
import { getSteps, getStepContent, fetchEnquiries, handleCellValueChanged } from "./EnquiryFormUtils";
import EnquiryFormPreview from "./EnquiryFormPreview";
import EnquiryFormTable from "./EnquiryFormTable";

function EnquiryForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    studentFirstName: "",
    studentLastName: "",
    studentPassport: "",
    enquirysource: "",
    studentPhone: "",
    alternatePhone: "",
    studentEmail: "",
    studentCountry: "",
    studentAddress: "",
    studentState: "",
    studentCity: "",
    studentZip: "",
    currentEducation: "",
    currentInstitution: "",
    currentCourse: "",
    countryInterested: "",
    universityInterested: "",
    courseInterested: "",
    level: "",
    intakeInterested: "",
    interestedServices: "",
    assignedUser: "",
    enquiryStatus: "",
    Notes: "",
  });
  const [enquiryData, setEnquiryData] = useState([]);
  const [errs, setErrs] = useState("");

  const steps = getSteps();

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  useState(() => {
    fetchEnquiries(setEnquiryData, setErrs);
  }, []);

  return (
    <Container maxWidth={false} disableGutters>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderColor: "primary.main",
              borderWidth: 1,
              borderStyle: "solid",
              backgroundColor: "#f9f9f9",
              boxShadow: 3,
              marginLeft: 3,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  backgroundColor: "primary.main",
                  color: "common.white",
                  padding: 1,
                }}
              >
                Enquiry Form
              </Typography>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <form onSubmit={(event) => event.preventDefault()}>
                {getStepContent(activeStep, formData, handleChange)}
                <Button onClick={handleBack} disabled={activeStep === 0}>
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    Next
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <EnquiryFormPreview formData={formData} />
        </Grid>
        <Grid item xs={12}>
          <EnquiryFormTable enquiryData={enquiryData} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default EnquiryForm;
