export type TaskStatus = "Completed" | "In Progress" | "Pending"

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: "Completed" | "In Progress" | "Pending";
  createdAt: string;
}
export interface Props  {
  tasks: Task[];
  deleteTask: (id: string) => void;
  isModalOpen: boolean;
  editingTask: Task | null;
  openModal: (task?: Task) => void;
  closeModal: () => void;
  handleSaveTask: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
};

export const initialTasks: Omit<Task, "id" | "createdAt">[] = [
  {
    title: "Design Landing Page",
    description: "Create hero section and responsive layout",
    priority: "High",
    status: "Completed",
  },
  {
    title: "Fix Auth Bug",
    description: "Resolve login token issue",
    priority: "High",
    status: "In Progress",
  },
  {
    title: "Prepare Presentation",
    description: "Slides for investor meeting",
    priority: "Medium",
    status: "Pending",
  },
  {
    title: "Create Dashboard Charts",
    description: "Add analytics graphs",
    priority: "Low",
    status: "Completed",  },
  {    title: "Complete project proposal",
    description: "Finish the initial draft for the new client project",
    status: "Pending",
    priority: "High",  },
  {    title: "Review team feedback",
    description: "Go through the comments from the last sprint review",
    status: "Completed",
    priority: "Medium",
  },
  {
    title: "Update documentation",
    description: "Ensure all API endpoints are properly documented",
    status: "Pending",
    priority: "Low",
  },
];
