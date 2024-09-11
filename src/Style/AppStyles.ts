import { SxProps } from "@mui/material";

export const appContainerStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  mt: 4,
  padding: "2rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
};

export const titleStyle: SxProps = {
  textDecoration: "underline",
  fontWeight: "bold",
  textAlign: "center",
  fontSize: "2rem",
  color: "#3f51b5",
  marginBottom: "1rem",
};

export const noTaskMessageStyle: SxProps = {
  fontWeight: "bold",
  mt: 6,
  fontSize: "1.2rem",
  color: "#757575",
};

export const taskListTitleStyle: SxProps = {
  textAlign: "center",
  fontWeight: "bold",
  mt: 2,
  mb: 2,
  fontSize: "1.5rem",
  color: "#4caf50",
};
