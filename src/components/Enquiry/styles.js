import { styled } from "@mui/material/styles";

export const StyledCard = styled("div")(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  borderWidth: "1px",
  borderStyle: "solid",
  backgroundColor: "#f9f9f9",
  boxShadow: theme.shadows[3],
}));

export const StyledHeader = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1),
}));

export const StyledTableContainer = styled("div")({
  position: "relative",
  maxHeight: 500,
  overflow: "hidden",
});

export const StyledTableRow = styled("tr")(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const StyledTableCell = styled("td")(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.action.hover,
}));
