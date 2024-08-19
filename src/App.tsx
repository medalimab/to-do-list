import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import InputField from "./components/InputField";
import TaskList from "./components/TaskList";
import { Task } from "./Interface/Task";
import { Box, Button, Typography } from "@mui/material";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { appContainerStyle, titleStyle, noTaskMessageStyle, taskListTitleStyle } from "./Style/AppStyles";


const Welcome = () => {
  return (
    <Box sx={appContainerStyle}>
      <Typography variant="h3" sx={titleStyle}>
        Welcome to Todo App
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/tasks">
        Get Started
      </Button>
    </Box>
  );
};

const App = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTask, setCompletedTask] = useState<Array<Task>>([]);

  const onDragEnd = (res: DropResult) => {
    const { destination, source } = res;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    let add;
    let active = tasks;
    let complete = completedTask;

    if (source.droppableId === "TaskList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TaskList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTask(complete);
    setTasks(active);
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
