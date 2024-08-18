
import { Task } from "../Interface/Task"; 

export interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  completedTask: Task[];
  setCompletedTask: React.Dispatch<React.SetStateAction<Task[]>>;
}
