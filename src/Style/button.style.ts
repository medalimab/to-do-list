import { Button, styled } from "@mui/material";

export const ButtonStyle = styled(Button)({
    variant: "contained",
    color: "white", // Change the text color to contrast the background
    type: "submit",
    marginLeft: '0.7rem',
    backgroundColor: "red", // Add background color
    '&:hover': {
      backgroundColor: "darkred", // Optional: change background on hover
    }
});
    