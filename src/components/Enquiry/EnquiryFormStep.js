import { TextField, Typography } from "@mui/material";

export const GetStep = ({ stepIndex, formData, handleChange }) => {
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
            fullWidth
            id="studentAddress"
            label="Student Address"
            name="studentAddress"
            type="text"
            value={formData.studentAddress}
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
            label="Current Education"
            name="currentEducation"
            type="text"
            value={formData.currentEducation}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
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
            required
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
            type="text"
            value={formData.interestedServices}
            onChange={handleChange}
          />
        </>
      );
    case 4:
      return (
        <>
          <TextField
            margin="normal"
            required
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
            required
            fullWidth
            id="enquiryStatus"
            label="Enquiry Status"
            name="enquiryStatus"
            type="text"
            value={formData.enquiryStatus}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="Notes"
            label="Notes"
            name="Notes"
            multiline
            rows={4}
            type="text"
            value={formData.Notes}
            onChange={handleChange}
          />
          <Typography variant="h5" gutterBottom marginTop={2}>
            Please review all details and click 'Submit' to send your enquiry.
          </Typography>
        </>
      );
    default:
      return "";
  }
};
