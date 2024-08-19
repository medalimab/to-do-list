import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CardListProps } from "../Interface/CardListProps";
import { CardStyles } from "../Style/CardStyles";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";

const CardList: React.FC<CardListProps> = ({ index, task, tasks, setTasks }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.task);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();    //pas de recharg
    setTasks(tasks.map((task) => (task.id === id ? { ...task, task: editTask } : task)));
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
          style={{ ...CardStyles.form, ...provided.draggableProps.style }} // Adding draggable styles
        >
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
              <Box sx={CardStyles.textBox}>
                <Typography
                  variant="body1"
                  style={{ textDecoration: task.isDone ? "line-through" : "none" }}
                >
                  {task.task}
                </Typography>
              </Box>
            )}

            <Grid container spacing={1} sx={CardStyles.buttonBox}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => {
                    if (!edit && !task.isDone) {
                      setEdit(!edit);
                    }
                  }}
                >
                  Edit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => handleDone(task.id)}
                >
                  Done
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      )}
    </Draggable>
  );
};

export default CardList;
