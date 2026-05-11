import { useState, useEffect } from "react";
import "./Tasks.css";
import type { Task } from "../../../Types";

type TaskStatus = Task["status"];

type TasksProps = {
  tasks: Task[];
  deleteTask: (id: string) => void;
  isModalOpen: boolean;
  editingTask: Task | null;
  openModal: (task?: Task) => void;
  closeModal: () => void;
  handleSaveTask: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
};

export default function Tasks({
  tasks,
  deleteTask,
  isModalOpen,
  editingTask,
  openModal,
  closeModal,
  handleSaveTask,
}: TasksProps): React.JSX.Element {
  
  const [activeFilter, setActiveFilter] = useState<"All" | TaskStatus>("All");
  
  // Estado local SOLO para los datos del formulario del modal
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    status: TaskStatus;
  }>({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
  });

  // Sincronizar el formulario cuando cambia el estado del modal o la tarea en edición
  useEffect(() => {
    if (isModalOpen) {
      if (editingTask) {
        // Modo Edición: Rellenar con datos de la tarea
        setFormData({
          title: editingTask.title,
          description: editingTask.description,
          priority: editingTask.priority,
          status: editingTask.status,
        });
      } else {
        // Modo Creación: Limpiar formulario
        setFormData({
          title: "",
          description: "",
          priority: "medium",
          status: "pending",
        });
      }
    }
  }, [isModalOpen, editingTask]);

  const filters: ("All" | TaskStatus)[] = [
    "All",
    "completed",
    "pending",
    // Añade "in-progress" si lo tienes en tus tipos, si no, quítalo
  ];

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "All") return true;
    return task.status === activeFilter;
  });

  const handleNewTaskClick = () => {
    openModal(); // Esto pone editingTask en null internamente
  };

  const handleEditClick = (task: Task) => {
    openModal(task); // Esto establece editingTask
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) return;
    
    // Llama a la función global que decide si crear o actualizar basado en editingTask
    handleSaveTask(formData);
    
    // closeModal() se llama dentro de handleSaveTask en useTasks, 
    // pero si prefieres hacerlo aquí, puedes descomentar la siguiente línea:
    // closeModal(); 
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
            {filter === "All" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)}
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
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2>{editingTask ? "Edit Task" : "Create New Task"}</h2>

            <div className="formGroup">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter task title"
              />
            </div>

            <div className="formGroup">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter task description"
              />
            </div>

            <div className="formGroup">
              <label>Priority</label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as "high" | "medium" | "low",
                  })
                }
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="formGroup">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as TaskStatus,
                  })
                }
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                {/* Añade "in-progress" si corresponde */}
              </select>
            </div>

            <div className="modalActions">
              <button
                className="cancelBtn"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="createBtn"
                onClick={handleSubmit}
              >
                {editingTask ? "Save Changes" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}