import "./Dashboard.css";
import { type Task } from "../../../Types";
import { useState, useEffect } from "react";

type DashboardProps = {
  tasks: Task[];
  isModalOpen: boolean;
  editingTask: Task | null;
  openModal: (task?: Task) => void;
  closeModal: () => void;
  handleSaveTask: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
};

export default function Dashboard({
  tasks,
  isModalOpen,
  editingTask,
  openModal,
  closeModal,
  handleSaveTask,
}: DashboardProps): React.JSX.Element {

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    status: "completed" | "pending";
  }>({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
  });
    const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;


  useEffect(() => {
    if (isModalOpen) {
      if (editingTask) {
        setFormData({
          title: editingTask.title,
          description: editingTask.description,
          priority: editingTask.priority,
          status: editingTask.status,
        });
      } else {
        setFormData({
          title: "",
          description: "",
          priority: "medium",
          status: "pending",
        });
      }
    }
  }, [isModalOpen, editingTask]);

  const recentTasks = [...tasks].slice(-3).reverse();

  const handleOpenNewTaskModal = () => {
    openModal(); 
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) return;
    
    handleSaveTask(formData);
    closeModal();
  };

  return (
    <div className="dashboardContainer">
      <div className="dashboardHeader">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back 👋 Here's your productivity overview.</p>
        </div>

        <button onClick={handleOpenNewTaskModal}>New Task</button>
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
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter task title"
              />
            </div>

            <div className="formGroup">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter task description"
              />
            </div>

            <div className="formGroup">
              <label>Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as "high" | "medium" | "low" })}
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
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "completed" | "pending" })}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="modalActions">
              <button className="cancelBtn" onClick={closeModal}>
                Cancel
              </button>
              <button className="createBtn" onClick={handleSubmit}>
                {editingTask ? "Save Changes" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="statsGrid">
        <div className="statCard">
          <div className="statTop">
            <div className="statInfo">
              <h3>Total Tasks</h3>
              <h2>{totalTasks}</h2>
            </div>
            <div className="statIcon">📋</div>
          </div>
        </div>

        <div className="statCard">
          <div className="statTop">
            <div className="statInfo">
              <h3>Completed</h3>
              <h2>{completedTasks}</h2>
            </div>
            <div className="statIcon">✅</div>
          </div>
        </div>

        <div className="statCard">
          <div className="statTop">
            <div className="statInfo">
              <h3>Pending</h3>
              <h2>{pendingTasks}</h2>
            </div>
            <div className="statIcon">⏳</div>
          </div>
        </div>
      </div>

      <div className="dashboardMain">
        <div className="dashboardPanel">
          <div className="panelHeader">
            <h2>Recent Tasks</h2>
          </div>

          <div className="taskList">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div key={task.id} className="taskItem">
                  <div className="taskInfo">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                  </div>
                  <span className={`status ${task.status}`}>
                    {task.status}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ padding: '1rem', color: '#666' }}>No recent tasks found.</p>
            )}
          </div>
        </div>

        <div className="sidebarSection">
          <div className="dashboardPanel">
            <div className="panelHeader">
              <h2>Weekly Progress</h2>
            </div>

            <div className="progressList">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, index) => {
                const percentages = [70, 45, 90, 80, 50];
                const percent = percentages[index];
                return (
                  <div key={day} className="progressItem">
                    <div className="progressTop">
                      <span>{day}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="progressBar">
                      <div className="progressFill" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
