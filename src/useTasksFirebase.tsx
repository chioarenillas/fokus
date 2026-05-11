import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp
} from "firebase/firestore";
import { db } from "./firebase";
import type { Task } from "./data/data";
import { useAuth } from "./context/AuthContext";
import { initialTasks } from "./data/data";

const COLLECTION_NAME = "tasks";


export const useTasksFirebase = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const tasksList: Task[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
      })) as Task[];

      setTasks(tasksList);

      if (tasksList.length === 0) {
        await migrateInitialData();
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const migrateInitialData = async () => {
    try {
      for (const task of initialTasks) {
        await addDoc(collection(db, COLLECTION_NAME), {
          ...task,
          createdAt: Timestamp.now(),
          userId: user?.uid,
        });
      }
      await fetchTasks();
    } catch (error) {
      console.error("Error migrating initial data:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const addTask = async (task: Omit<Task, "id" | "createdAt">) => {
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...task,
        createdAt: Timestamp.now(),
        userId: user.uid,
      });

      const newTask: Task = {
        ...task,
        id: docRef.id,
        createdAt: new Date().toISOString(),
      };

      setTasks((prev) => [newTask, ...prev]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (
    id: string,
    updates: Partial<Omit<Task, "id" | "createdAt">>
  ) => {
    try {
      const taskRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(taskRef, updates);

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getTaskById = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  const openModal = (task?: Task) => {
    setEditingTask(task || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    closeModal();
  };

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
    loading,
    refreshTasks: fetchTasks,
  };
};