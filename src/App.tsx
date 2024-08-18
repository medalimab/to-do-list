import React, { useState } from "react";
import InputField from "./components/InputField";
import TaskList from "./components/TaskList";
import { Task } from "./Interface/Task";
import { Box, Typography } from "@mui/material";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTask, setCompletedTask] = useState<Array<Task>>([]);

  //drag implementation
  const onDragEnd = (res: DropResult) => {
    const { destination, source } = res;

    // Do nothing if there is no destination
    if (!destination) {
      return;
    }

    // Do nothing if the task is dropped at the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = tasks;
    let complete = completedTask;

    // Source task tracking
    if (source.droppableId === "TaskList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination task tracking
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          sx={{ textDecoration: "underline" }}
        >
          Todo List
        </Typography>
        <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
        <Box>
          {tasks.length === 0 ? (
            <Typography variant="h6" fontWeight="bold" mt={6}>
              No task added
            </Typography>
          ) : (
            <div>
              <Typography
                textAlign="center"
                fontWeight="bold"
                mt={2}
                mb={2}
              >
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
  );
};

export default App;
