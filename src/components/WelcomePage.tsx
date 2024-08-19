import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  welcomePageContainerStyle,
  welcomeTitleStyle,
  welcomeImageStyle,
} from "../Style/WelcomePageStyles";
import todoImage from "../assets/todo.png";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={welcomePageContainerStyle}>
      <img src={todoImage} alt="" style={welcomeImageStyle} />
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

export default Welcome;
