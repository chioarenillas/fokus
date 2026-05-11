import { useState } from "react";
import "./Tasks.css";
import type { Task, Props, TaskStatus } from "../../../data/data"
import TaskModal from "../../../components/TaskModal";

export default function Tasks({
  tasks,
  deleteTask,
  isModalOpen,
  editingTask,
  openModal,
  closeModal,
  handleSaveTask
}: Props): React.JSX.Element {
  
  const [activeFilter, setActiveFilter] = useState<"All" | TaskStatus>("All");
  

  const filters: ("All" | TaskStatus)[] = [
    "All",
    "Completed",
    "Pending",
    "In Progress",
  ];

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "All") return true;
    return task.status === activeFilter;
  });

  const handleNewTaskClick = () => {
    openModal(); 
  };

  const handleEditClick = (task: Task) => {
    openModal(task); 
  };


  return (
    <div className="tasksContainer">
      <div className="tasksHeader">
        <div>
          <h1>Tasks</h1>
          <p>Manage your workflow and stay productive.</p>
        </div>
        <button onClick={handleNewTaskClick}>+ New Task</button>
      </div>

      <div className="tasksFilters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={activeFilter === filter ? "activeFilter" : ""}
            onClick={() => setActiveFilter(filter)}
          >
            {filter === "All" ? "All" : filter}
          </button>
        ))}
      </div>

      <div className="tasksGrid">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="taskCard">
              <div className="taskCardTop">
                <span className={`priorityBadge ${task.priority}`}>
                  {task.priority}
                </span>

                <span
                  className={`statusBadge ${task.status}`}
                >
                  {task.status}
                </span>
              </div>
              <div className="taskCardBody">
                <h2>{task.title}</h2>
                <p>{task.description}</p>
              </div>
              <div className="taskCardBottom">
                <button onClick={() => handleEditClick(task)}>Edit</button>
                <button
                  className="deleteBtn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#666" }}>
            No tasks found for this filter.
          </p>
        )}
      </div>

      {isModalOpen && (
        <TaskModal 
          editingTask={editingTask} 
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          handleSaveTask={handleSaveTask}/>
      )}
    </div>
  );
}