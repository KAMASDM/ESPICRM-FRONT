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

function Application() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    application: "",
    sop: "",
    cv: "",
    passport: "",
    ielts: "",
    gre: "",
    toefl: "",
    gmat: "",
    pte: "",
    work_experience: "",
    diploma_marksheet: "",
    bachelor_marksheet: "",
    master_marksheet: "",
    other_documents: "",
    application_status: "",
  });

  const steps = [
    "Basic Details",
    "Exam Documents",
    "Education Documents",
    "Status",
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files[0] });
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
              label="Application"
              name="application"
              value={formData.application}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Statement of Purpose"
              name="sop"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Curriculum Vitae"
              name="cv"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              margin="normal"
            />
          </Container>
        );
      case 1:
        return (
          <Container>
            <TextField
              fullWidth
              label="Passport"
              name="passport"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="IELTS"
              name="ielts"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="GRE"
              name="gre"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="TOEFL"
              name="toefl"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="GMAT"
              name="gmat"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="PTE"
              name="pte"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              margin="normal"
            />
          </Container>
        );
      case 2:
        return (
          <Container>
            <TextField
              fullWidth
              label="Work Experience"
              name="work_experience"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Diploma Marksheet"
              name="diploma_marksheet"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Bachelor Marksheet"
              name="bachelor_marksheet"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Master Marksheet"
              name="master_marksheet"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Other Documents"
              name="other_documents"
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              margin="normal"
            />
          </Container>
        );
      case 3:
        return (
          <Container>
            <FormControl fullWidth margin="normal">
              <InputLabel id="status-label">Application Status</InputLabel>
              <Select
                labelId="status-label"
                name="application_status"
                value={formData.application_status}
                onChange={handleChange}
                label="Application Status"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Container>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
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
                sx={{
                  backgroundColor: "primary.main",
                  color: "common.white",
                  padding: 1,
                }}
              >
                Application Form
              </Typography>

              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <form>
                {getStepContent(activeStep)}
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
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderColor: "primary.main",
              borderWidth: "1px",
              borderStyle: "solid",
              backgroundColor: "#f9f9f9",
              boxShadow: 3,
              height: "100%",
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
                <Table size="small" aria-label="a dense table" stickyHeader>
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default Application;
