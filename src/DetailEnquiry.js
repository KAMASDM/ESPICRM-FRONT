import React, { useState, useEffect } from "react";
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
  styled,
  Card,
  CardContent,
   
} from "@mui/material";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FileUpload } from "@mui/icons-material";


function getSteps() {
  return [
    "Basic Information",
    "Examination Details",
    "Family Details",
    "Education Details",
    "Other Documents",
    "Offer Letter",
    "Refusal Letter",
    "Exam Documents",
    "Confirmed Services",
    "Status",
  ];
}

function DetailEnquiry() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Initialize all form fields with empty values or appropriate defaults
    Current_Enquiry: "",
    Current_Education_Details: "",
    Tenth_Education_Details: "",
    Twelveth_Education_Details: "",
    Graduation_Education_Details: "",
    Work_Experience: "",
    Toefl_Exam: "",
    ielts_Exam: "",
    PTE_Exam: "",
    Duolingo_Exam: "",
    Gre_Exam: "",
    Gmat_Exam: "",
    Father_Occupation: "",
    Father_Annual_Income: "",
    Twelveth_Document: "",
    Tenth_Document: "",
    Graduation_Marksheet: "",
    Graduation_Certificate: "",
    UG_Marksheet: "",
    UG_Certificate: "",
    Work_Experience_Document: "",
    Passport_Document: "",
    Offer_Letter: "",
    Refusal: "",
    Ielts_Result: "",
    Toefl_Result: "",
    PTE_Result: "",
    Duolingo_Result: "",
    Grr_Result: "",
    Gmat_Result: "",
    Confirmed_Services: "",
    followup: "",
    Enquiry_Status: "",
  });

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Container>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Current_Enquiry"
              label="Current Enquiry"
              name="Current_Enquiry"
              value={formData.Current_Enquiry}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Current_Education_Details"
              label="Current Education Details"
              name="Current_Education_Details"
              value={formData.Current_Education_Details}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Tenth_Education_Details"
              label="Tenth Education Details"
              name="Tenth_Education_Details"
              value={formData.Tenth_Education_Details}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Twelveth_Education_Details"
              label="Twelveth Education Details"
              name="Twelveth_Education_Details"
              value={formData.Twelveth_Education_Details}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Graduation_Education_Details"
              label="Graduation Education Details"
              name="Graduation_Education_Details"
              value={formData.Graduation_Education_Details}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Work_Experience"
              label="Work Experience"
              name="Work_Experience"
              value={formData.Work_Experience}
              onChange={handleChange}
            />
          </Container>
        );

      case 1:
        return (
          <Container>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Toefl_Exam"
              label="Toefl Exam"
              name="Toefl_Exam"
              value={formData.Toefl_Exam}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="ielts_Exam"
              label="Ielts Exam"
              name="ielts_Exam"
              value={formData.ielts_Exam}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="PTE_Exam"
              label="PTE Exam"
              name="PTE_Exam"
              value={formData.PTE_Exam}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Duolingo_Exam"
              label="Duolingo Exam"
              name="Duolingo_Exam"
              value={formData.Duolingo_Exam}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Gre_Exam"
              label="Gre Exam"
              name="Gre_Exam"
              value={formData.Gre_Exam}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Gmat_Exam"
              label="Gmat Exam"
              name="Gmat_Exam"
              value={formData.Gmat_Exam}
              onChange={handleChange}
            />

            {/* Add more fields for the first step */}
          </Container>
        );

      case 2:
        return (
          <Container>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Father_Occupation"
              label="Father Occupation"
              name="Father_Occupation"
              value={formData.Father_Occupation}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Father_Annual_Income"
              label="Father Annual Income"
              name="Father_Annual_Income"
              value={formData.Father_Annual_Income}
              onChange={handleChange}
            />
            {/* Add more fields for the second step */}
          </Container>
        );

      case 3:
        return (
          <Container>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Twelveth_Document"
              label="Twelveth Document"
              name="Twelveth_Document"
              type="file"
              InputLabelProps={{ shrink: true }}
              value={formData.Twelveth_Document}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Tenth_Document"
              label="Tenth Document"
              name="Tenth_Document"
              type="file"
              InputLabelProps={{ shrink: true }}
              value={formData.Tenth_Document}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Graduation_Marksheet"
              label="Graduation Marksheet"
              name="Graduation_Marksheet"
              type="file"
              InputLabelProps={{ shrink: true }}
              value={formData.Graduation_Marksheet}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Graduation_Certificate"
              label="Graduation Certificate"
              name="Graduation_Certificate"
              type="file"
              InputLabelProps={{ shrink: true }}
              value={formData.Graduation_Certificate}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="UG_Marksheet"
              label="UG Marksheet"
              name="UG_Marksheet"
              type="file"
              InputLabelProps={{ shrink: true }}
              value={formData.UG_Marksheet}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="UG_Certificate"
              label="UG Certificate"
              name="UG_Certificate"
              type="file"
              InputLabelProps={{ shrink: true }}
              value={formData.UG_Certificate}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Work_Experience_Document"
              label="Work Experience Document"
              name="Work_Experience_Document"
              type="file"
              InputLabelProps={{ shrink: true }}
              value={formData.Work_Experience_Document}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Passport_Document"
              label="Passport Document"
              name="Passport_Document"
              type="file"
              InputLabelProps={{ shrink: true }}
              value={formData.Passport_Document}
              onChange={handleChange}
            />
            {/* Add more fields for the third step */}
          </Container>
        );

      case 4:
        return (
          <Container>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Offer_Letter"
              label="Upload Offer Letter"
              InputLabelProps={{ shrink: true }}
              alternativeLabel="Upload Offer Letter"
              name="Offer_Letter"
              type="file"
              value={formData.Offer_Letter}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Refusal"
              label="Upload Refusal Letter"
              name="Refusal"
              InputLabelProps={{ shrink: true }}
              type="file"
              value={formData.Refusal}
              onChange={handleChange}
            />
            {/* Add more fields for the fourth step */}
          </Container>
        );

      case 5:
        return (
          <Container>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Ielts_Result"
              label="Ielts Result"
              name="Ielts_Result"
              type="file"
              InputLabelProps={{ shrink: true }}
              value={formData.Ielts_Result}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Toefl_Result"
              label="Toefl Result"
              name="Toefl_Result"
              type="file"
              InputLabelProps={{ shrink: true }}
              value={formData.Toefl_Result}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="PTE_Result"
              label="PTE Result"
              name="PTE_Result"
              type="file"
              InputLabelProps={{ shrink: true }}
              value={formData.PTE_Result}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Duolingo_Result"
              label="Duolingo Result"
              name="Duolingo_Result"
              type="file"
              InputLabelProps={{ shrink: true }}
              value={formData.Duolingo_Result}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Gre_Result"
              label="Gre Result"
              name="Gre_Result"
              type="file"
              InputLabelProps={{ shrink: true }}
              value={formData.Gre_Result}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Gmat_Result"
              label="Gmat Result"
              name="Gmat_Result"
              type="file"
              InputLabelProps={{ shrink: true }}
              value={formData.Gmat_Result}
              onChange={handleChange}
            />
            {/* Add more fields for the fifth step */}
          </Container>
        );

      case 6:
        return (
          <Container>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Confirmed_Services"
              label="Confirmed Services"
              name="Confirmed_Services"
              value={formData.Confirmed_Services}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="offer_letter"
              label="Offer Letter"
              name="offer_letter"
              type="file"
              InputLabelProps={{ shrink: true }}
              value={formData.offer_letter}
              onChange={handleChange}
            />
            {/* Add more fields for the sixth step */}
          </Container>
        );

      case 7:
        return (
          <Container>
            <TextField
              margin="normal"
              required
              fullWidth
              id="followup"
              label="Followup"
              name="followup"
              value={formData.followup}
              onChange={handleChange}
            />
            {/* Add more fields for the seventh step */}
          </Container>
        );

      case 8:
        return (
          <Container>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Enquiry_Status"
              label="Enquiry Status"
              name="Enquiry_Status"
              value={formData.Enquiry_Status}
              onChange={handleChange}
            />
            {/* Add more fields for the eighth step */}
          </Container>
        );
      // Add other cases for each step
      case 9:
        return (
          <Container>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Enquiry_Status"
              label="Enquiry Status"
              name="Enquiry_Status"
              value={formData.Enquiry_Status}
              onChange={handleChange}
            />
            {/* Add more fields for the final step */}
          </Container>
        );
      default:
        return "Unknown step";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Typically handle the submission to the backend here
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  }));
  // Define a custom row Design in ag-grid
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));


  


  

  useEffect(() => {
    fetchEnquiries();
  }, []);
  const [EnquiryData, setEnquiryData] = useState([]);
  const [errs, setErrs] = useState("");
  const fetchEnquiries = async () => {
    try {
      const response = await fetch(
        "https://cloudconnectcampaign.com/espicrmnew/api/detailsEnquiry/"
      );
      if (response.status === 200) {
        const data = await response.json();
        const enquiriesWithNo = data.map((enquiry, index) => ({
          ...enquiry,
          no: index + 1,
        }));
        setEnquiryData(enquiriesWithNo);
      } else if (response.status === 500) {
        setErrs("No Inquiry found");
      } else {
        setErrs("Error While Fetching Data");
      }
    } catch (error) {
      console.log("error", error);
    }
  };





  
  
  const columns = [

    
    {
      headerName: "Current Enquiry",
      
      field: "Current_Enquiry",
      valueGetter: (params) =>
        params.data.Current_Enquiry?.student_First_Name || "",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Current Education Details",
      // No need for 'field' if you're using a 'valueGetter'
      valueGetter: (params) => params.data.Current_Education_Details?.level || "No education data",
   
      sortable: true,
      filter: true,
      editable: true,
    },




    

    {
      headerName: "Tenth Education Details",
      field: "Tenth_Education_Details",
      valueGetter: (params) => {
        const details = params.data.Tenth_Education_Details;
        if (!details) return "No education data";
    
        // Construct a detailed string
        return `Level: ${details.level || '-'}, Stream: ${details.Stream || '-'}, Percentage: ${details.Percentage || '-'}%, Year of Passing: ${details.Year_of_Passing || '-'}, Institute: ${details.Name_of_Institute || '-'}, Medium: ${details.Medium_of_Education || '-'}, Board: ${details.Board || '-'}`;
      },
      sortable: true,
      filter: true,
      editable: false, // Assu
    
    
},

    {
      headerName: "Twelveth Education Details",
      field: "Twelveth_Education_Details",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Graduation Education Details",
      field: "Graduation_Education_Details",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Work Experience",
      field: "Work_Experience",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Toefl Exam",
      field: "Toefl_Exam",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Ielts Exam",
      field: "ielts_Exam",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "PTE Exam",
      field: "PTE_Exam",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Duolingo Exam",
      field: "Duolingo_Exam",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Gre Exam",
      field: "Gre_Exam",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Gmat Exam",
      field: "Gmat_Exam",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Father Occupation",
      field: "Father_Occupation",
      
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Father Annual Income",
      field: "Father_Annual_Income",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Twelveth Document",
      field: "Twelveth_Document",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Tenth Document",
      field: "Tenth_Document",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Graduation Marksheet",
      field: "Graduation_Marksheet",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Graduation Certificate",
      field: "Graduation_Certificate",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "UG Marksheet",
      field: "UG_Marksheet",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "UG Certificate",
      field: "UG_Certificate",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Work Experience Document",
      field: "Work_Experience_Document",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Passport Document",
      field: "Passport_Document",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Offer Letter",
      field: "Offer_Letter",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Refusal",
      field: "Refusal",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Ielts Result",
      field: "Ielts_Result",
      FileUpload: true,
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Toefl Result",
      field: "Toefl_Result",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "PTE Result",
      field: "PTE_Result",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Duolingo Result",
      field: "Duolingo_Result",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Gre Result",
      field: "Gre_Result",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Gmat Result",
      field: "Gmat_Result",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Confirmed Services",
      field: "Confirmed_Services",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Followup",
      field: "followup",
      sortable: true,
      filter: true,
      editable: true,
    },

    {
      headerName: "Enquiry Status",
      field: "Enquiry_Status",
      sortable: true,
      filter: true,
      editable: true,
    },
  ];


  
  const updateDataOnServer = async (data) => {
    try {
      const url = `https://cloudconnectcampaign.com/espicrmnew/api/detailsEnquiry/${data.id}/`; // Use the correct URL and endpoint
      const response = await fetch(url, {
        method: "PATCH", // or 'PATCH'
        headers: {
          "Content-Type": "application/json",
          // Include other headers as required, such as Authorization
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log("Update successful:", responseData);
      } else {
        console.error("Update failed:", responseData);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  

  const handleCellValueChanged = async (params) => {
    // Extract the updated data from the params
    const updatedRowData = params.data;

    // Call your existing API update function
    await updateDataOnServer(updatedRowData);
  };

  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 === 0) {
      // Even row index, return a style object with a background color
      return { background: "#f9f9f9" };
    } else {
      // Odd row index, return a different style or null for default
      return { background: "#ffffff" };
    }
  };

  return (
    <Container component="main"  sx={{ marginTop: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              borderColor: "primary.main", // Set the border color
              borderWidth: "1px", // Set the border width
              borderStyle: "solid", // Required to show the border
              backgroundColor: "#f9f9f9", // Light gray background for contrast
              boxShadow: 3,              
              fontSize: 4,
              maxwidth:{
                xs: 300, // max width on extra-small devices
                sm: 500, // max width on small devices
                md: 700, // max width on medium devices
                lg: 800, // max width on large devices
                xl: 1000, // max width on extra-large devices
              }
              // Optional: adds shadow for 3D effect
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
                Detail Enquiry Form
              </Typography>

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
                  <Button
                    padding="1"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
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
          <Box
            sx={{
                borderColor: "primary.main", // Set the border color
              borderWidth: "1px", // Set the border width
              borderStyle: "solid", // Required to show the border
              backgroundColor: "#f9f9f9", // Light gray background for contrast
              boxShadow: 3,              
              fontSize: 4,
              height:'100%',
              maxwidth:{
                xs: 300, // max width on extra-small devices
                sm: 500, // max width on small devices
                md: 700, // max width on medium devices
                lg: 800, // max width on large devices
                xl: 5000, // max width on extra-large devices
              }
              }}
            >
              <Paper sx={{ position: "sticky", top: 10, zIndex: 1, bottom: 50, }}>
                <Card
                  sx={{
                    borderColor: "primary.main", // Set the border color
                    borderWidth: "1px", // Set the border width
                    borderStyle: "solid", // Required to show the border
                    backgroundColor: "#f9f9f9", // Light gray background for contrast
                    boxShadow: 3, // Optional: adds shadow for 3D effect
                    height:'100%',
                  }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      padding: 1,
                    }}
                  >
                       Detail Enquiry Preview
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
                              {value.toString()}
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
        </Grid>
      </Grid>

      <Grid item xs={12} md={24}>
        {/* Other components or additional content here */}
        <Card
          sx={{
            borderColor: "primary.main", // Set the border color
            borderWidth: "1px", // Set the border width
            borderStyle: "solid", // Required to show the border
            backgroundColor: "#f9f9f9", // Light gray background for contrast
            boxShadow: 5,
            padding: 1,
            marginTop: 3, // Optional: adds shadow for 3D effect
          }}
        >
          <CardContent>
            <Box
              sx={{
                position: "relative",
                maxHeight: 500,
                overflow: "hidden",
                padding: "10",
              }}
            >
              <div
                className="ag-theme-alpine"
                style={{
                  height: "100%",
                  width: "300%",
                  marginTop: 1,
                  padding: 1,
                  backgroundColor: "#f9f9f9",
                  boxShadow: 3,
                  borderColor: "primary.main",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  overflow: "hidden",
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
                      width: "100%",
                    }}
                  >
                    Enquiry Details
                  </Typography>
                  <AgGridReact
                    rowData={EnquiryData}
                    columnDefs={columns}
                    onCellValueChanged={handleCellValueChanged}
                    sideBar={{
                      defaultToolPanel: "columns",
                    }}
                  //  getRowStyle={getRowStyle}
                    ensureDomOrder={true}
                    pagination={true}
                    paginationPageSize={10}
                    domLayout="autoHeight"
                    resizable={true}
                    sortable={true}
                    animateRows={true}
                    editable={true}
                    filter="agTextColumnFilter"
                    rowSelection="multiple"
                    aggregateOnlyChangedColumns={true}
                    
                    
                    

                  />
                </CardContent>
              </div>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}

export default DetailEnquiry;
