import { SxProps } from "@mui/system";
import { Theme } from "@mui/material";

export const welcomePageContainerStyle: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  textAlign: "center",
};

export const welcomeTitleStyle: SxProps<Theme> = {
  marginBottom: "1rem",
};

export const welcomeImageStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "400px", 
  marginBottom: "2rem",
};
