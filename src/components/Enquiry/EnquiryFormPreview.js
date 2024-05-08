import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Card, CardContent, Typography, Box, Paper } from "@mui/material";

function EnquiryFormPreview({ formData }) {
  return (
    <Box
      sx={{
        position: "relative",
        maxHeight: 470,
        overflow: "hidden",
        borderColor: "primary.main",
        width: "100%",
        marginRight: 10,
      }}
    >
      <Paper sx={{ position: "sticky", top: 0, zIndex: 1 }}>
        <Card
          sx={{
            borderColor: "primary.main",
            borderWidth: 1,
            borderStyle: "solid",
            backgroundColor: "#f9f9f9",
            boxShadow: 3,
            width: "95%",
            marginLeft: 1,
            
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ backgroundColor: "primary.main", color: "common.white", padding: 1 }}
            >
              Form Data Preview
            </Typography>
            <TableContainer component={Box} sx={{ maxHeight: 460, overflow: "auto" }}>
              <Table size="small" aria-label="a dense table" stickyHeader>
                <TableBody>
                  {Object.entries(formData).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row" sx={{ fontWeight: "bold", backgroundColor: "action.hover" }}>
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </TableCell>
                      <TableCell align="right">{value?.toString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
}

export default EnquiryFormPreview;
