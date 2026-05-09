export type TaskStatus = "Completed" | "In Progress" | "Pending";


export interface Task {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  status: TaskStatus;
}

export const tasks: Task[] = [
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