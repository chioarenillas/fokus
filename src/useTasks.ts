import { useState } from "react";
import type { Task } from "./Types";


const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the initial draft for the new client project",
    status: "pending",
    priority: "high",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Review team feedback",
    description: "Go through the comments from the last sprint review",
    status: "completed",
    priority: "medium",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Update documentation",
    description: "Ensure all API endpoints are properly documented",
    status: "pending",
    priority: "low",
    createdAt: new Date().toISOString(),
  },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (
    id: string,
    updates: Partial<Omit<Task, "id" | "createdAt">>,
  ) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getTaskById = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  const openModal = (task?: Task) => {
    setEditingTask(task || null)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }
  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createAt'>) => {
    if (editingTask){
        updateTask(editingTask.id, taskData)
    }else{
        addTask(taskData)
    }
    closeModal()
  }


  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    handleSaveTask,
    isModalOpen,
    editingTask,
    openModal,
    closeModal,
  };
};
