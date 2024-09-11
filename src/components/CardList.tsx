import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CardListProps } from "../Interface/CardListProps";
import { CardStyles } from "../Style/CardStyles";
import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";

const CardList: React.FC<CardListProps> = ({ index, task, tasks, setTasks }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.name);

  const handleEdit = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    try {
      const updatedTask = { ...task, name: editTask };
      await axios.put(`http://localhost:3001/tasks/${id}`, updatedTask);

      // Update the task in the state after a successful API call
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      setEdit(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3001/tasks/${id}`);
      // Call the API to delete the task
     // await axios.delete(`http://localhost:3001/tasks/${id}`);

      // Remove the task from the state after a successful API call
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };



  const handleDone = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isDone: !task.isDone } : task)));
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <form
          onSubmit={(e) => handleEdit(e, task.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...CardStyles.form, ...provided.draggableProps.style }}
        >
          <Paper elevation={3} sx={CardStyles.paper}>
            <Box sx={CardStyles.box}>
              {edit ? (
                <TextField
                  value={editTask}
                  placeholder="Enter task"
                  onChange={(e) => setEditTask(e.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  sx={CardStyles.input}
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{ textDecoration: task.isDone ? "line-through" : "none", ...CardStyles.text }}
                >
                  {task.name}
                </Typography>
              )}
              <Grid container spacing={1} sx={CardStyles.buttonBox}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => !edit && !task.isDone && setEdit(!edit)}
                  >
                    Edit
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="error" size="small" onClick={() => handleDelete(task.id)}>
                    Delete
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="success" size="small" onClick={() => handleDone(task.id)}>
                    Done
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </form>
      )}
    </Draggable>
  );
};

export default CardList;