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

export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design Landing Page",
    description: "Create hero section and responsive layout",
    priority: "High",
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Fix Auth Bug",
    description: "Resolve login token issue",
    priority: "High",
    status: "In Progress",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Prepare Presentation",
    description: "Slides for investor meeting",
    priority: "Medium",
    status: "Pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Create Dashboard Charts",
    description: "Add analytics graphs",
    priority: "Low",
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Complete project proposal",
    description: "Finish the initial draft for the new client project",
    status: "Pending",
    priority: "High",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Review team feedback",
    description: "Go through the comments from the last sprint review",
    status: "Completed",
    priority: "Medium",
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Update documentation",
    description: "Ensure all API endpoints are properly documented",
    status: "Pending",
    priority: "Low",
    createdAt: new Date().toISOString(),
  },
];
