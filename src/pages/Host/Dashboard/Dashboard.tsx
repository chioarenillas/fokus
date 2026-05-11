import "./Dashboard.css";
import { type Props } from "../../../data/data";
import TaskModal from "../../../components/TaskModal";


export default function Dashboard({
  tasks,
  isModalOpen,
  editingTask,
  openModal,
  closeModal,
  handleSaveTask,
}: Props): React.JSX.Element {

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;
  const recentTasks = [...tasks].slice(0,3);

  const handleOpenNewTaskModal = () => {
    openModal(); 
  };


  return (
    <div className="dashboardContainer">
      <div className="dashboardHeader">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back 👋 Here's your productivity overview.</p>
        </div>

        <button onClick={handleOpenNewTaskModal}>+ New Task</button>
      </div>

      {isModalOpen && (
        <TaskModal 
        editingTask={editingTask} 
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        handleSaveTask={handleSaveTask}/>
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
              <h3>In Progress</h3>
              <h2>{inProgressTasks}</h2>
            </div>
            <div className="statIcon">📈</div>
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
