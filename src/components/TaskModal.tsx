import React from 'react'
import { type Task } from "../data/data";
import { useState, useEffect } from 'react';

type Props = {
  isModalOpen: boolean;
  editingTask: Task | null;
  closeModal: () => void;
  handleSaveTask: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
};


export default function TaskModal({editingTask, closeModal, handleSaveTask, isModalOpen}: Props) {
    
      const [formData, setFormData] = useState<{
        title: string;
        description: string;
      priority: "High" | "Medium" | "Low";
      status: "Completed" | "In Progress" | "Pending";
      }>({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
      });
    
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
          priority: "Medium",
          status: "Pending",
        });
      }
    }
  }, [isModalOpen, editingTask]);


    const handleSubmit = () => {
    if (!formData.title.trim()) return;
    
    handleSaveTask(formData);
    closeModal();
  };

  return (
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
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as "High" | "Medium" | "Low" })}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="formGroup">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "Completed" | "Pending" | "In Progress" })}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="In Progres">In Progress</option>
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
  )
}
