import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import InputField from "./components/InputField";
import TaskList from "./components/TaskList";
import Welcome from "./components/WelcomePage";
import { Task } from "./Interface/Task";
import { Box, Typography } from "@mui/material";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { appContainerStyle, titleStyle, noTaskMessageStyle, taskListTitleStyle } from "./Style/AppStyles";

const App = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTask, setCompletedTask] = useState<Task[]>([]);
  const [blockedTasks, setBlockedTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);


  const onDragEnd = (res: DropResult) => {
    const { destination, source } = res;

    // Early return if there is no destination or if the destination is the same as the source
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
        return;
    }

    let active = [...tasks];
    let inProgress = [...inProgressTasks];
    let blocked = [...blockedTasks];
    let complete = [...completedTask];
    let movedTask: Task | null = null;

    // Remove the task from the source list
    if (source.droppableId === "TaskList") {
        movedTask = active[source.index];
        active.splice(source.index, 1);
    } else if (source.droppableId === "InProgressTasks") {
        movedTask = inProgress[source.index];
        inProgress.splice(source.index, 1);
    } else if (source.droppableId === "BlockedTasks") {
        movedTask = blocked[source.index];
        blocked.splice(source.index, 1);
    } else if (source.droppableId === "TaskRemove") {
        movedTask = complete[source.index];
        complete.splice(source.index, 1);
    }

    // Early return if the movedTask is null (just in case)
    if (!movedTask) return;

    // Add the task to the destination list
    if (destination.droppableId === "TaskList") {
        active.splice(destination.index, 0, movedTask);
    } else if (destination.droppableId === "InProgressTasks") {
        inProgress.splice(destination.index, 0, movedTask);
    } else if (destination.droppableId === "BlockedTasks") {
        blocked.splice(destination.index, 0, movedTask);
    } else if (destination.droppableId === "TaskRemove") {
        complete.splice(destination.index, 0, movedTask);
    }

    // Update the state after moving the task
    setTasks(active);
    setInProgressTasks(inProgress);
    setBlockedTasks(blocked);
    setCompletedTask(complete);
};


  
  
  

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      setTasks([...tasks, { id: Date.now(), task, isDone: false }]);
      setTask("");
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/tasks" element={
          <DragDropContext onDragEnd={onDragEnd}>
            <Box sx={appContainerStyle}>
              <Typography variant="h3" sx={titleStyle}>
                Todo List
              </Typography>
              <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
              <Box>
                {tasks.length === 0 ? (
                  <Typography variant="h6" sx={noTaskMessageStyle}>
                    No task added
                  </Typography>
                ) : (
                  <div>
                    <Typography sx={taskListTitleStyle}>
                      All tasks
                    </Typography>
                    <TaskList
                      tasks={tasks}
                      setTasks={setTasks}
                      completedTask={completedTask}
                      setCompletedTask={setCompletedTask}
                      blockedTasks={blockedTasks} // Pass blocked tasks
                      setBlockedTasks={setBlockedTasks} // Pass setter for blocked tasks
                      
                      inProgressTasks={inProgressTasks} // Ajouté pour les tâches en cours
                      setInProgressTasks={setInProgressTasks} // Ajouté pour les tâches en cours
                    />
                  </div>
                )}
              </Box>
            </Box>
          </DragDropContext>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
