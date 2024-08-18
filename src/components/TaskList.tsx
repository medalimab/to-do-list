import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import CardList from "./CardList";
import { TaskListProps } from "../Interface/TaskListProps"; 
import {
  taskBoxStyle,
  incompleteTaskBgColor,
  completedTaskBgColor,
} from "../Style/TaskListStyles"; 

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  setTasks,
  completedTask,
  setCompletedTask,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box style={{ ...taskBoxStyle, backgroundColor: incompleteTaskBgColor }}>
          <Droppable droppableId="TaskList">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                <Typography variant="h6" style={{ textDecoration: "underline", marginBottom: "0.5rem" }}>
                  Incomplete tasks
                </Typography>
                {tasks?.map((task, index) => (
                  <CardList
                    index={index}
                    tasks={tasks}
                    task={task}
                    key={task.id}
                    setTasks={setTasks}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box style={{ ...taskBoxStyle, backgroundColor: completedTaskBgColor }}>
          <Droppable droppableId="TaskRemove">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                <Typography variant="h6" style={{ textDecoration: "underline", marginBottom: "0.5rem" }}>
                  Completed tasks
                </Typography>
                {completedTask?.map((task, index) => (
                  <CardList
                    index={index}
                    tasks={completedTask}
                    task={task}
                    key={task.id}
                    setTasks={setCompletedTask}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TaskList;
