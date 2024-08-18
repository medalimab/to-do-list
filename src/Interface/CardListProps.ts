import { Task } from "./Task";

export interface CardListProps {
  index: number;
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  
  
}
