import React from "react";
import "./App.css";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTask, deleteTask }) => {
  return (
    <li className= "todo-item" >
      <label className="checkbox-container">
        <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
        <span className="checkbox-custom"></span>
      </label>
        
        <p className={`todo-text ${task.completed ? "completed" : ""}`} onClick={() => toggleTask(task.id)}>
         <div>{task.text}</div>
        </p>

    </li>
  );
};

export default TaskItem;
