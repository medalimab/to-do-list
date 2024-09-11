/** @format */

import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import InputField from './components/InputField';
import TaskList from './components/TaskList';
import Welcome from './components/WelcomePage';
import { Task } from './Interface/Task';
import { Box, Typography } from '@mui/material';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import {
	appContainerStyle,
	titleStyle,
	noTaskMessageStyle,
	taskListTitleStyle,
} from './Style/AppStyles';
import axios from 'axios';

const App = () => {
	const [task, setTask] = useState<string>('');
	const [tasks, setTasks] = useState<Task[]>([]);
	const [completedTask, setCompletedTask] = useState<Task[]>([]);
	const [blockedTasks, setBlockedTasks] = useState<Task[]>([]);
	const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		try {
			const response = await axios.get('http://localhost:3001/tasks/user/1');
			console.log('Tasks fetched:', response.data);

			const fetchedTasks = response.data.data;

			// Verificación de que fetchedTasks es un array antes de asignarlo
			if (Array.isArray(fetchedTasks)) {
				setTasks(fetchedTasks);

				// Filtrado condicional
				const incompleteTasks = fetchedTasks.filter(
					(task) => task.status.toLowerCase() === 'incomplete',
				);
				const completedTasks = fetchedTasks.filter(
					(task) => task.status.toLowerCase() === 'complete',
				);
				const blockedTaskss = fetchedTasks.filter(
					(task) => task.status.toLowerCase() === 'blocked',
				);
				const inProgressTaskss = fetchedTasks.filter(
					(task) => task.status.toLowerCase() === 'inprogress',
				);

				setTasks(incompleteTasks);
				setCompletedTask(completedTasks);
				setBlockedTasks(blockedTaskss);
				setInProgressTasks(inProgressTaskss);
			} else {
				console.error('Fetched tasks are not an array');
			}
		} catch (error) {
			console.error('Error fetching tasks:', error);
		}
	};
	// Function to update the task order and status in the backend
	const updateTaskOrder = async (task: Task, newStatus: string) => {
		try {
			const res = await axios.patch(
				`http://localhost:3001/tasks/${task.id}/status`,
				{ status: newStatus },
			);
			setTask(res.data);
		} catch (error) {
			console.error('Error updating task status:', error);
		}
	};

	const onDragEnd = async (res: DropResult) => {
		const { destination, source } = res;

		if (
			!destination ||
			(destination.droppableId === source.droppableId &&
				destination.index === source.index)
		) {
			return;
		}

		let active = [...tasks];
		let inProgress = [...inProgressTasks];
		let blocked = [...blockedTasks];
		let complete = [...completedTask];
		let movedTask: Task | null = null;

		// Remove the task from the source list
		if (source.droppableId === 'TaskList') {
			movedTask = active[source.index];
			active.splice(source.index, 1);
		} else if (source.droppableId === 'InProgressTasks') {
			movedTask = inProgress[source.index];
			inProgress.splice(source.index, 1);
		} else if (source.droppableId === 'BlockedTasks') {
			movedTask = blocked[source.index];
			blocked.splice(source.index, 1);
		} else if (source.droppableId === 'TaskRemove') {
			movedTask = complete[source.index];
			complete.splice(source.index, 1);
		}

		if (!movedTask) return;

		// Determine the new status based on the destination droppableId
		let newStatus = '';
		if (destination.droppableId === 'TaskList') newStatus = 'Incomplete';
		if (destination.droppableId === 'InProgressTasks') newStatus = 'InProgress';
		if (destination.droppableId === 'BlockedTasks') newStatus = 'Blocked';
		if (destination.droppableId === 'TaskRemove') newStatus = 'Complete';

		// Update the task status in the backend
		await updateTaskOrder(movedTask, newStatus);

		// Add the task to the destination list
		if (destination.droppableId === 'TaskList') {
			active.splice(destination.index, 0, movedTask);
		} else if (destination.droppableId === 'InProgressTasks') {
			inProgress.splice(destination.index, 0, movedTask);
		} else if (destination.droppableId === 'BlockedTasks') {
			blocked.splice(destination.index, 0, movedTask);
		} else if (destination.droppableId === 'TaskRemove') {
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
			setTasks([
				...tasks,
				{
					id: Date.now(),
					name: task,
					isDone: false,
					status: 'incomplete',
					description: null,
				},
			]);
			setTask('');
		}
	};

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Welcome />} />
				<Route
					path='/tasks'
					element={
						<DragDropContext onDragEnd={onDragEnd}>
							<Box sx={appContainerStyle}>
								<Typography variant='h3' sx={titleStyle}>
									Todo List
								</Typography>
								<InputField
									task={task}
									setTask={setTask}
									handleAdd={handleAdd}
								/>
								<Box>
									{tasks.length === 0 ? (
										<Typography variant='h6' sx={noTaskMessageStyle}>
											No task added
										</Typography>
									) : (
										<div>
											<Typography sx={taskListTitleStyle}>All tasks</Typography>
											<TaskList
												tasks={tasks}
												setTasks={setTasks}
												completedTask={completedTask}
												setCompletedTask={setCompletedTask}
												blockedTasks={blockedTasks}
												setBlockedTasks={setBlockedTasks}
												inProgressTasks={inProgressTasks}
												setInProgressTasks={setInProgressTasks}
											/>
										</div>
									)}
								</Box>
							</Box>
						</DragDropContext>
					}
				/>
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</Router>
	);
};

export default App;