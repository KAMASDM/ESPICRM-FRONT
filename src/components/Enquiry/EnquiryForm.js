// src/components/Enquiry/EnquiryForm.js
import React, { useState, useEffect } from "react";
import { Container, Stepper, Step, StepLabel, Button, Card, CardContent, Grid, Box } from "@mui/material";
import EnquiryFormPreview from "./EnquiryFormPreview";
import EnquiryFormTable from "./EnquiryFormTable";
import { getSteps, getStepContent } from "./EnquiryFormUtils";
import { fetchEnquiries } from "./authUtils"; // Import the utility function
import { StyledCard, StyledHeader } from "./styles";

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

    const steps = getSteps();

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
        // Handle form submission to the backend here
    };

    const [enquiryData, setEnquiryData] = useState([]);
    const [errs, setErrs] = useState("");

    useEffect(() => {
        fetchEnquiries(setEnquiryData, setErrs);
    }, []);

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
                    </StyledCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <EnquiryFormPreview formData={formData} />
                </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
                <EnquiryFormTable enquiryData={enquiryData} setErrs={setErrs} />
            </Grid>
        </Container>
    );
};

export default EnquiryForm;
