import React, { useState } from "react";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid,
  Box,
  Select,
  InputLabel,
  MenuItem,
  Card,
  CardContent,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";

function Assessment() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    enquiryName: "",
    countryInterested: "",
    universityList: "",
    courseName: "",
    level: "",
    intake: "",
    specialization: "",
    duration: "",
    applicationFee: "",
    tuitionFee: "",
    feeCurrency: "",
    courseLink: "",
    assignedUsers: "",
    notes: "",
  });

  const steps = ["Basic Information", "Course Details", "Fees and Links"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    backgroundColor: theme.palette.action.hover,
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Container>
            <TextField
              fullWidth
              label="Enquiry Name"
              name="enquiryName"
              value={formData.enquiryName}
              onChange={handleChange}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="country-label">Country Interested</InputLabel>
              <Select
                labelId="country-label"
                name="countryInterested"
                value={formData.countryInterested}
                onChange={handleChange}
                label="Country Interested"
              >
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
              </Select>
            </FormControl>
          </Container>
        );
      case 1:
        return (
          <Container>
            <TextField
              fullWidth
              label="Course Name"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="University List"
              name="universityList"
              value={formData.universityList}
              onChange={handleChange}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="level-label">Level</InputLabel>
              <Select
                labelId="level-label"
                name="level"
                value={formData.level}
                onChange={handleChange}
                label="Level"
              >
                <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                <MenuItem value="Postgraduate">Postgraduate</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Intake"
              name="intake"
              value={formData.intake}
              onChange={handleChange}
              margin="normal"
            />
          </Container>
        );
      case 2:
        return (
          <Container>
            <TextField
              fullWidth
              label="Duration of Course"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Application Fee"
              name="applicationFee"
              value={formData.applicationFee}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Tuition Fee"
              name="tuitionFee"
              value={formData.tuitionFee}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Fee Currency"
              name="feeCurrency"
              value={formData.feeCurrency}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Course Link"
              name="courseLink"
              value={formData.courseLink}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Assigned Users"
              name="assignedUsers"
              value={formData.assignedUsers}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
            />
          </Container>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12} md={6} position={"relative"} marginLeft={30}>
        <Card
          sx={{
            borderColor: "primary.main",
            borderWidth: "1px",
            borderStyle: "solid",
            backgroundColor: "#f9f9f9",
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {getStepContent(activeStep)}
              <div style={{ marginTop: 20 }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  style={{ marginLeft: 8 }}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card
          sx={{
            borderColor: "primary.main",
            borderWidth: "1px",
            borderStyle: "solid",
            backgroundColor: "#f9f9f9",
            boxShadow: 3,
            width: 350,
          }}
        >
          <CardContent>
            <Box
              sx={{
                position: "relative",
                maxHeight: 470,
                overflow: "hidden",
                borderColor: "primary.main",
              }}
            >
              <Paper sx={{ position: "sticky", top: 0, zIndex: 1 }}>
                <Card
                  sx={{
                    borderColor: "primary.main",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    backgroundColor: "#f9f9f9",
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="div"
                      sx={{
                        backgroundColor: "primary.main",
                        color: "common.white",
                        padding: 1,
                      }}
                    >
                      Form Data Preview
                    </Typography>
                    <TableContainer
                      component={Box}
                      sx={{ maxHeight: 460, overflow: "auto" }}
                    >
                      <Table
                        size="small"
                        aria-label="a dense table"
                        stickyHeader
                      >
                        <TableBody>
                          {Object.entries(formData).map(([key, value]) => (
                            <StyledTableRow key={key}>
                              <StyledTableCell component="th" scope="row">
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {value?.toString()}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Paper>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Assessment;
