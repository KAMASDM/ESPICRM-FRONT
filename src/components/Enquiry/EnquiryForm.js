import React, { useState } from "react";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  CardContent,
  Grid,
} from "@mui/material";
import EnquiryPreview from "../Enquiry/EnquiryPreview";
import EnquiryTable from "./EnquiryTable";
import { GetStep } from "./EnquiryFormStep";
import { StyledCard, StyledHeader } from "../Style/style";

const steps = [
  "Personal Information",
  "Contact Information",
  "Education Details",
  "Interest Details",
  "Submission",
];

const EnquiryForm = () => {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <StyledCard>
            <CardContent>
              <StyledHeader>Enquiry Form</StyledHeader>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <form onSubmit={handleSubmit}>
                <GetStep
                  stepIndex={activeStep}
                  formData={formData}
                  handleChange={handleChange}
                />
                <Button onClick={handleBack} disabled={activeStep === 0}>
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
              </form>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <EnquiryPreview formData={formData} />
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <EnquiryTable />
      </Grid>
    </Container>
  );
};

export default EnquiryForm;
