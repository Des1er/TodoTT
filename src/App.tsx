import React, { useState } from "react";
import "./App.css";
import TaskItem from "./TaskItem.tsx";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

type Filter = "all" | "active" | "completed";

const App: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const activeTaskCount = tasks.filter(task => !task.completed).length;

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-container">
      <input className = "input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a task..." />
      <button className = "add-button" onClick={addTask}>Add</button>
      </div>
      
      <ul className="todo-list">
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
        ))}
      </ul>
      <footer className="footer">
        <p className ="counter"> {activeTaskCount} tasks remaining</p>

        <div className="filters">
          <button onClick={() => setFilter("all")} className={`button ${filter === "all" ? "active" : ""}`}>All</button>
          <button onClick={() => setFilter("active")} className={`button ${filter === "active" ? "active" : ""}`}>Active</button>
          <button onClick={() => setFilter("completed")} className={`button ${filter === "completed" ? "active" : ""}`}>Completed</button>
        </div>
        
        <button  className = "button" onClick={clearCompleted}>Clear Completed</button>
      </footer>

    </div>
  );
};

export default App;
