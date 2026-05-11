import { useState } from "react";
import "./Tasks.css";
import { tasks, type TaskStatus, type Task } from "../../../data/data";

export default function Tasks(): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState<"All" | TaskStatus>("All");
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    status: TaskStatus;
  }>({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
  });

  const filters: ("All" | TaskStatus)[] = ["All", "Completed", "In Progress", "Pending"];

  const filteredTasks = taskList.filter((task) => {
    if (activeFilter === "All") return true;
    return task.status === activeFilter;
  });

  const handleDelete = (id: number) => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  const handleNewTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: Date.now(),
      ...newTask,
    };
    
    setTaskList((prev) => [...prev, task]);
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="tasksContainer">
      <div className="tasksHeader">
        <div>
          <h1>Tasks</h1>
          <p>Manage your workflow and stay productive.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)}>+ New Task</button>
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

      {isModalOpen && (
        <div className="modalOverlay" onClick={() => setIsModalOpen(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Task</h2>
            
            <div className="formGroup">
              <label>Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Enter task title"
              />
            </div>

            <div className="formGroup">
              <label>Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Enter task description"
              />
            </div>

            <div className="formGroup">
              <label>Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as "High" | "Medium" | "Low" })}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="formGroup">
              <label>Status</label>
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value as TaskStatus })}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="modalActions">
              <button className="cancelBtn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="createBtn" onClick={handleNewTask}>
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}