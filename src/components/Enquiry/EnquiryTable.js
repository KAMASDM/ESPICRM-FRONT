import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const EnquiryTable = () => {
  const [enquiryData, setEnquiryData] = useState([]);
  const fetchEnquiries = async () => {
    const url = "https://cloudconnectcampaign.com/espicrmnew/api/enquiries/";
    let token = localStorage.getItem("authToken");
    try {
      let response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEnquiryData(
          data.map((enquiry, index) => ({ ...enquiry, no: index + 1 }))
        );
      } else {
        console.error("Error fetching data:");
      }
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);
  
  const handleCellValueChanged = async (params) => {
    try {
      const response = await fetch(
        `https://cloudconnectcampaign.com/espicrmnew/api/enquiries/${params.data.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(params.data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update");
      }
      console.log("Update successful");
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const columns = [
    {
      headerName: "Student First Name",
      field: "student_First_Name",
      editable: true,
    },
    {
      headerName: "Student Last Name",
      field: "student_Last_Name",
      editable: true,
    },
    {
      headerName: "Student Email",
      field: "student_email",
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
      editable: true,
    },
    {
      headerName: "Interested Services",
      editable: true,
      valueGetter: (params) => {
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
      editable: true,
    },
    {
      headerName: "Intake Interested",
      field: "intake_interested.intake_Name",
      editable: true,
    },
    {
      headerName: "Assigned Users",
      valueGetter: (params) => params.data.assigned_users?.username || "",
      editable: true,
    },
    {
      headerName: "Enquiry Status",
      field: "enquiry_status.status",
      editable: true,
    },
    {
      headerName: "Notes",
      field: "notes",
      editable: true,
    },
    {
      headerName: "Total Price INR",
      valueGetter: (params) => {
        if (
          params.data.Interested_Services &&
          params.data.Interested_Services.length > 0
        ) {
          return params.data.Interested_Services.reduce(
            (sum, service) => sum + (service.Price || 0),
            0
          );
        }
        return "No services";
      },
    },
    {
      headerName: "Source Inquiry",
      field: "Source_Enquiry.Source",
      editable: true,
    },
  ];

  return (
    <Card
      sx={{
        borderColor: "primary.main",
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "#f9f9f9",
        boxShadow: 3,
        width: "100%",
        marginTop: 5,
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
          Recent Enquiry Details
        </Typography>
        <Box
          sx={{
            position: "relative",
            maxHeight: 500,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div
            className="ag-theme-alpine"
            style={{ height: "100%", width: "100%" }}
          >
            <AgGridReact
              rowData={enquiryData}
              columnDefs={columns}
              onCellValueChanged={(params) => handleCellValueChanged(params)}
              sideBar={{ defaultToolPanel: "columns" }}
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
            />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EnquiryTable;
