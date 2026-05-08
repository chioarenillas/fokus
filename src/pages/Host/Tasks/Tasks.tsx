import "./Tasks.css"

type TaskStatus = "Completed" | "In Progress" | "Pending";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: TaskStatus;
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Design Landing Page",
    description: "Create hero section and responsive layout",
    priority: "High",
    status: "Completed",
  },
  {
    id: 2,
    title: "Fix Auth Bug",
    description: "Resolve login token issue",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Prepare Presentation",
    description: "Slides for investor meeting",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 4,
    title: "Create Dashboard Charts",
    description: "Add analytics graphs",
    priority: "Low",
    status: "Completed",
  },
];

export default function Tasks(): React.JSX.Element {
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
        <button className="activeFilter">All</button>
        <button>Completed</button>
        <button>In Progress</button>
        <button>Pending</button>
      </div>

      <div className="tasksGrid">
        {tasks.map((task) => (
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
              <button className="deleteBtn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
