import { useState } from "react";
import "./Tasks.css";
import { tasks, type TaskStatus, type Task } from "../../../data/data";

export default function Tasks(): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState<"All" | TaskStatus>("All");
    const [taskList, setTaskList] = useState<Task[]>(tasks);

  const filters: ("All" | TaskStatus)[] = ["All", "Completed", "In Progress", "Pending"];

  const filteredTasks = taskList.filter((task) => {
    if (activeFilter === "All") return true;
    return task.status === activeFilter;
  });

  const handleDelete = (id: number) => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="tasksContainer">
      <div className="tasksHeader">
        <div>
          <h1>Tasks</h1>
          <p>Manage your workflow and stay productive.</p>
        </div>
        <button>+ New Task</button>
      </div>

      <div className="tasksFilters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={activeFilter === filter ? "activeFilter" : ""}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="tasksGrid">
        {filteredTasks.map((task) => (
          <div key={task.id} className="taskCard">
            <div className="taskCardTop">
              <span className={`priorityBadge ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>

              <span
                className={`statusBadge ${
                  task.status === "Completed"
                    ? "completed"
                    : task.status === "In Progress"
                      ? "progress"
                      : "pending"
                }`}
              >
                {task.status}
              </span>
            </div>
            <div className="taskCardBody">
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </div>
            <div className="taskCardBottom">
              <button>Edit</button>
              <button 
                className="deleteBtn" 
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}