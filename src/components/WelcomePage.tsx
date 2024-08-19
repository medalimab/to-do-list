import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  welcomePageContainerStyle,
  welcomeTitleStyle,
  welcomeImageStyle,
} from "../Style/WelcomePageStyles";
import welcomeImage from ""; 

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={welcomePageContainerStyle}>
      <img src={welcomeImage} alt="Welcome" style={welcomeImageStyle} />
      <Typography variant="h3" sx={welcomeTitleStyle}>
        Welcome to the Todo App
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/tasks")}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default WelcomePage;
