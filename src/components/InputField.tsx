import React from "react";
import { Button, TextField, Box } from "@mui/material";
import { formStyle, containerStyle } from "../Style/InputStyle"; 
import { InputFieldProps } from "../Interface/InputFieldProps"; 

const InputField: React.FC<InputFieldProps> = ({ task, setTask, handleAdd }) => {
  return (
    <form style={formStyle} onSubmit={handleAdd}>
      <Box style={containerStyle}>
        <TextField
          placeholder="Add a task"
          variant="outlined"
          size="medium"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginLeft: '0.7rem' }}
        >
          Add
        </Button>
      </Box>
    </form>
  );
};

export default InputField;
