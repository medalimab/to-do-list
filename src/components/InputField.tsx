import React from 'react';
import axios from 'axios';
import { InputFieldProps } from '../Interface/InputFieldProps';
import { Button, TextField, Box } from '@mui/material';
import { containerStyle, formStyle } from '../Style/InputStyle';
import { ButtonStyle } from '../Style/button.style';

const InputField: React.FC<InputFieldProps> = ({ task, setTask, handleAdd }) => {
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      try {
        console.log('Task being sent:', task);
        await axios.post('http://localhost:3001/tasks', {
          name: task,
          userId: 1, // Replace with dynamic userId if needed
          isDone: false,
        });
        setTask(''); // Clear the input field after adding the task
        window.location.reload();
      } catch (err) {
        console.error('Error adding task:', err);
        if (axios.isAxiosError(err)) {
          console.error('Server responded with:', err.response?.data);
        }
      }
    } else {
      console.error('Task name cannot be empty');
    }
  };

  return (
    <form style={formStyle} onSubmit={handleAddTask}>
      <Box style={containerStyle}>
        <TextField
          placeholder="Add a task"
          variant="outlined"
          size="medium"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          fullWidth
        />
        
      < ButtonStyle>
       
        
          Add
          </ButtonStyle>
        
      </Box>
    </form>
  );
};

export default InputField;
