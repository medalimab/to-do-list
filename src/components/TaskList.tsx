import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import CardList from "./CardList";
import { TaskListProps } from "../Interface/TaskListProps";
import { taskBoxStyle, incompleteTaskBgColor, completedTaskBgColor, blockedTaskBgColor,inProgressTaskBgColor } from "../Style/TaskListStyles";

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, completedTask, setCompletedTask, blockedTasks, setBlockedTasks,inProgressTasks,setInProgressTasks }) => {
  return (
    <Grid container spacing={3}>
     <Grid item xs={3}>
  <Paper elevation={3} style={{ ...taskBoxStyle, backgroundColor: incompleteTaskBgColor }}>
  <Droppable droppableId="TaskList">
  {(provided) => (
    <Box
      ref={provided.innerRef}
      {...provided.droppableProps}
      sx={{ minHeight: "100px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
    >
      <Typography variant="h6" sx={{ textDecoration: "underline", marginBottom: "1rem" }}>
        Incomplete Tasks
      </Typography>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <CardList index={index} tasks={tasks} task={task} key={task.id} setTasks={setTasks} />
        ))
      ) : (
        <Typography variant="body2" sx={{ color: "gray" }}>
          View Empty
        </Typography>
      )}
      {provided.placeholder}
    </Box>
  )}
</Droppable>
  </Paper>
</Grid>
      <Grid item xs={3}>
  <Paper elevation={3} style={{ ...taskBoxStyle, backgroundColor: inProgressTaskBgColor }}>
    <Droppable droppableId="InProgressTasks">
      {(provided) => (
        <Box ref={provided.innerRef} {...provided.droppableProps}>
          <Typography variant="h6" sx={{ textDecoration: "underline", marginBottom: "1rem" }}>
            In Progress Tasks
          </Typography>
          {inProgressTasks.map((task, index) => (
            <CardList index={index} tasks={inProgressTasks} task={task} key={task.id} setTasks={setInProgressTasks} />
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  </Paper>
</Grid>


      <Grid item xs={3}>
      <Paper elevation={3} style={{ ...taskBoxStyle, backgroundColor: blockedTaskBgColor }}>
          <Droppable droppableId="BlockedTasks">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                <Typography variant="h6" sx={{ textDecoration: "underline", marginBottom: "1rem" }}>
                  Blocked Tasks
                </Typography>
                {blockedTasks.map((task, index) => (
                  <CardList index={index} tasks={blockedTasks} task={task} key={task.id} setTasks={setBlockedTasks} />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Paper>
      </Grid>

      <Grid item xs={3}>
      <Paper elevation={3} style={{ ...taskBoxStyle, backgroundColor: completedTaskBgColor }}>
          <Droppable droppableId="TaskRemove">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                <Typography variant="h6" sx={{ textDecoration: "underline", marginBottom: "1rem" }}>
                  Completed Tasks
                </Typography>
                {completedTask.map((task, index) => (
                  <CardList index={index} tasks={completedTask} task={task} key={task.id} setTasks={setCompletedTask} />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TaskList;
