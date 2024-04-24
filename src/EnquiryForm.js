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
  Card,
  CardContent,
  CardHeader,
  Autocomplete,
} from "@mui/material";
import styled from "@mui/material/styles/styled";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import NotesWidget from "./NotesWidget";

//----------------------------------------Above are the imports-------------------------------------------->>

// Function to get geolocation
function getLocation(setFormData) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchAddress(
          position.coords.latitude,
          position.coords.longitude,
          setFormData
        );
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Function to fetch address data
function fetchAddress(latitude, longitude, setFormData) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setFormData((formData) => ({
        ...formData,
        studentCountry: data.address.country,
        //studentAddress: data.studentAddress,
        studentState: data.address.state,
        studentCity: data.address.city || data.address.county,
        studentZip: data.address.postcode,
      }));
    })
    .catch((error) => console.error("Error fetching address:", error));
}

// Function to update data on the server
const updateDataOnServer = async (data) => {
  try {
    const url = `https://cloudconnectcampaign.com/espicrmnew/api/enquiries/${data.id}/`; // Use the correct URL and endpoint
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

// Function to handle the cell value change
const handleCellValueChanged = async (params) => {
  // Extract the updated data from the params
  const updatedRowData = params.data;

  // Call your existing API update function
  await updateDataOnServer(updatedRowData);
};

// Function to get the steps for the Enquiry Form
function EnquiryForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [enquirySource, setEnquirySource] = useState([]);
  const [formData, setFormData] = useState({
    // personal information
    studentFirstName: "",
    studentLastName: "",
    studentPassport: "",
    enquirysource: "",

    // contact information
    studentPhone: "",
    alternatePhone: "",
    studentEmail: "",
    studentCountry: "",
    studentAddress: "",
    studentState: "",
    studentCity: "",
    studentZip: "",

    // education details
    currentEducation: "",
    currentInstitution: "",
    currentCourse: "",

    // interest details
    countryInterested: "",
    universityInterested: "",
    courseInterested: "",
    level: "",
    intakeInterested: "",
    interestedServices: "",

    // For Counsellor
    assignedUser: "",
    enquiryStatus: "",
    Notes: "",
  });

  // Define the steps for the Stepper
  const steps = getSteps();

  // Function to handle form data changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle the next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Function to handle the previous step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Typically handle the submission to the backend here
  };

  // Function to fetch enquiry sources
  useEffect(() => {
    getLocation(setFormData);
    const fetchEnquirySources = async () => {
      try {
        const response = await fetch(
          "https://cloudconnectcampaign.com/espicrmnew/api/enquiry_sources/"
        );
        const data = await response.json();
        setEnquirySource(data);
      } catch (error) {
        console.error("Failed to fetch enquiry sources", error);
      }
    };
    fetchEnquirySources();
  }, []);

  // Function to handle the select change
  const handleSelectChange = (event, newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      enquirysource: newValue ? newValue.label : "",
    }));
  };

  // Define a custom cell Design in ag-grid
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

  const [EnquiryData, setEnquiryData] = useState([]);
  const [errs, setErrs] = useState("");

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch(
        "https://cloudconnectcampaign.com/espicrmnew/api/enquiries/"
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

  // Define a custom cell Design in ag-grid
  const cellStyle = {
    padding: "8px", // More padding for better cell content spacing
    borderRight: "3px solid #ddd", // Solid right border with a light color
    lineHeight: "10px", // Increased line height for better readability
    textAlign: "left", // Ensure text aligns to the left, you can adjust based on content
    backgroundColor: "#f9f9f9", // A light background color that is easy on the eyes
    fontSize: "14px", // Slightly larger font size for readability
    fontWeight: "normal", // Normal weight but can be bold for headings
    color: "#333", // Darker text color for contrast
    transition: "background-color 0.3s", // Smooth transition for hover effects
    "&:hover": {
      backgroundColor: "#e9e9e9", // Slightly darker on hover to indicate interactivity
    },
  };

  // Function to get the steps for the Enquiry Form
  function getSteps() {
    return [
      "Personal Information",
      "Contact Information",
      "Education Details",
      "Interest Details",
      "Submission",
    ];
  }

  function getStepContent(
    stepIndex,
    formData,
    handleChange,
    enquirySource,
    setFormData
  ) {
    console.log("enquirySource", enquirySource);
    switch (stepIndex) {
      case 0:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="studentFirstName"
              label="Student First Name"
              name="studentFirstName"
              value={formData.studentFirstName}
              onChange={handleChange}
              autoComplete="given-name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="studentLastName"
              label="Student Last Name"
              name="studentLastName"
              value={formData.studentLastName}
              onChange={handleChange}
              autoComplete="family-name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="studentPassport"
              label="Student Passport Number"
              name="studentPassport"
              type="text"
              value={formData.studentPassport}
              onChange={handleChange}
            />
            <Autocomplete
              options={enquirySource} // Assuming enquirySource is already an array of { id, Source, ... }
              getOptionLabel={(option) => option.Source || ""} // Make sure 'Source' is the property you want to show
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enquiry Source"
                  variant="outlined"
                />
              )}
              onChange={(event, newValue) => {
                // Assuming 'newValue' will be the whole object selected from 'options'
                setFormData((prev) => ({
                  ...prev,
                  enquirysource: newValue ? newValue.Source : "", // Storing 'Source' directly if you need the whole object adjust accordingly
                }));
              }}
              value={
                enquirySource.find(
                  (option) => option.Source === formData.enquirysource
                ) || null
              } // Make sure you find by 'Source' or adjust according to your need
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="studentPhone"
              label="Student Phone"
              name="studentPhone"
              type="tel"
              value={formData.studentPhone}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="alternatePhone"
              label="Alternate Phone"
              name="alternatePhone"
              type="tel"
              value={formData.alternatePhone}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="studentEmail"
              label="Student Email"
              name="studentEmail"
              type="email"
              value={formData.studentEmail}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="country"
              label="Student Country"
              name="studentCountry"
              type="text"
              value={formData.studentCountry}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="studentAddress"
              label="Student Address"
              name="studentAddress"
              multiline
              rows={2}
              value={formData.studentAddress}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="studentState"
              label="Student State"
              name="studentState"
              value={formData.studentState}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="studentCity"
              label="Student City"
              name="studentCity"
              value={formData.studentCity}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="studentZip"
              label="Student Zip"
              name="studentZip"
              type="number"
              value={formData.studentZip}
              onChange={handleChange}
            />
          </>
        );
      case 2:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="currentEducation"
              label="Current Education Level"
              name="currentEducation"
              type="text"
              value={formData.currentEducation}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="currentInstitution"
              label="Current Institution"
              name="currentInstitution"
              type="text"
              value={formData.currentInstitution}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="currentCourse"
              label="Current Course"
              name="currentCourse"
              type="text"
              value={formData.currentCourse}
              onChange={handleChange}
            />
          </>
        );
      case 3:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="countryInterested"
              label="Country Interested"
              name="countryInterested"
              type="text"
              value={formData.countryInterested}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="universityInterested"
              label="University Interested"
              name="universityInterested"
              type="text"
              value={formData.universityInterested}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="courseInterested"
              label="Course Interested"
              name="courseInterested"
              type="text"
              value={formData.courseInterested}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="level"
              label="Level"
              name="level"
              type="text"
              value={formData.level}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="intakeInterested"
              label="Intake Interested"
              name="intakeInterested"
              type="text"
              value={formData.intakeInterested}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="interestedServices"
              label="Interested Services"
              name="interestedServices"
              type="checkbox"
              value={formData.interestedServices}
              onChange={handleChange}
            />

            {/* Additional fields like universityInterested, courseInterested, etc. */}
          </>
        );
      case 4:
        return (
          <>
            <TextField
              margin="normal"
              fullWidth
              id="assignedUser"
              label="Assigned User"
              name="assignedUser"
              type="text"
              value={formData.assignedUser}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="enquiryStatus"
              label="Enquiry Status"
              name="enquiryStatus"
              type="text"
              value={formData.enquiryStatus}
              onChange={handleChange}
            />
            <textarea
              label="Notes"
              margin="normal"
              multiline
              rows={4}
              align="left"
              fullWidth
              id="Notes"
              name="Notes"
              //type="textarea"
              value={formData.Notes}
              onChange={handleChange}
            />
            <Typography variant="h5" gutterBottom marginTop={2}>
              Please review all details and click 'Submit' to send your enquiry.
            </Typography>
          </>
        );

      default:
        return "Unknown stepIndex";
    }
  }

  const columns = [
    // { headerName: "Edit", cellRenderer: "editName" },
    // { headerName: "No", field: "no" },

    {
      headerName: "Student First Name",
      field: "student_First_Name",
      cellStyle,
      editable: true,
    },
    {
      headerName: "Student Last Name",
      field: "student_Last_Name",
      cellStyle,
      editable: true,
    },
    {
      headerName: "Student Email",
      field: "student_email",
      cellStyle,
      editable: true,
    },
    {
      headerName: "Country Interested",
      valueGetter: (params) => params.data.country_interested?.country || "",
      editable: true,
    },
    {
      headerName: "University Interested",
      field: "university_interested.univ_name",
      cellStyle,
      editable: true,
    },
    {
      headerName: "Interested Services",
      editable: true,
      valueGetter: (params) => {
        // Map through the Interested_Services array and extract each service's name
        const services = params.data.Interested_Services?.map(
          (service) => service.Services
        ).join(", ");
        return services || "No services";
      },
    },
    {
      headerName: "Course Interested",
      valueGetter: (params) => params.data.course_interested?.course_name || "",
      editable: true,
    },
    {
      headerName: "Level Applying For",
      field: "level_applying_for.levels",
      cellStyle,
      editable: true,
    },
    {
      headerName: "Intake Interested",
      field: "intake_interested.intake_Name",
      cellStyle,
      editable: true,
    },
    {
      headerName: "Assigned Users",
      valueGetter: (params) => params.data.assigned_users?.username || "",
      cellStyle,
      editable: true,
    },
    {
      headerName: "Enquiry Status",
      field: "enquiry_status.status",
      cellStyle,
      editable: true,
    },
    { headerName: "Notes", field: "notes", cellStyle, editable: true },
    { headerName: "Total Price INR",
    valueGetter: (params) => {
      // Check if Interested_Services exists and has elements
      if (params.data.Interested_Services && params.data.Interested_Services.length > 0) {
        // Reduce the array to sum up the prices
        const total = params.data.Interested_Services.reduce((sum, service) => {
          return sum + (service.Price || 0); // Add the price of each service, defaulting to 0 if it's undefined
        }, 0); // Start with an initial sum of 0
        return total;
      }
      return "No services"; // Return this if no services are available or if Interested_Services is empty
    },
    },
    
    {
      headerName: "Source Inquiry",
      field: "Source_Enquiry.Source",
      cellStyle,
      editable: true,
    },

    
    // { headerName: "Edit", cellRenderer: "editCompany",cellStyle }
  ];


  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 === 0) {
      // Even row index, return a style object with a background color
      return { background: '#f9f9f9' };
    } else {
      // Odd row index, return a different style or null for default
      return { background: '#ffffff' };
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              borderColor: "primary.main", // Set the border color
              borderWidth: "1px", // Set the border width
              borderStyle: "solid", // Required to show the border
              backgroundColor: "#f9f9f9", // Light gray background for contrast
              boxShadow: 3, // Optional: adds shadow for 3D effect
            }}
          >
            <CardHeader
              title="Notes"
              variant="h6"
              sx={{ bgcolor: "primary.main", color: "white", padding: 1 }}
            />
            <CardContent>
              <NotesWidget />
            </CardContent>{" "}
            {/* Add your NotesWidget here */}
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderColor: "primary.main", // Set the border color
              borderWidth: "1px", // Set the border width
              borderStyle: "solid", // Required to show the border
              backgroundColor: "#f9f9f9", // Light gray background for contrast
              boxShadow: 3, // Optional: adds shadow for 3D effect
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
              <form onSubmit={handleSubmit}>
                {getStepContent(
                  activeStep,
                  formData,
                  handleChange,
                  enquirySource,
                  handleSelectChange
                )}
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
        <Grid item xs={12} md={3}>
          {/* Other components or additional content here */}
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
                  borderColor: "primary.main", // Set the border color
                  borderWidth: "1px", // Set the border width
                  borderStyle: "solid", // Required to show the border
                  backgroundColor: "#f9f9f9", // Light gray background for contrast
                  boxShadow: 3, // Optional: adds shadow for 3D effect
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
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={12} md={8}>
        {/* Other components or additional content here */}
        <Card
          sx={{
            borderColor: "primary.main", // Set the border color
            borderWidth: "1px", // Set the border width
            borderStyle: "solid", // Required to show the border
            backgroundColor: "#f9f9f9", // Light gray background for contrast
            boxShadow: 3,
            padding: 1,
            marginTop: 10, // Optional: adds shadow for 3D effect
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
                style={{ height: "100%", width: "100%", marginTop: 1, 
                padding: 1, backgroundColor: "#f9f9f9", boxShadow: 3, 
                borderColor: "primary.main", borderWidth: "1px", 
                borderStyle: "solid", overflow: "hidden", }}
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
                    Recent Enquiry Details
                  </Typography>
                  <AgGridReact
                    rowData={EnquiryData}
                    columnDefs={columns}
                    onCellValueChanged={handleCellValueChanged}
                    sideBar={{
                      defaultToolPanel: "columns",
                    }}
                    getRowStyle={getRowStyle}
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

export default EnquiryForm;
