import api from "./api";

export const createTask = async (task: {
  title: string;
  description: string;
  status: string;
  priority: number;
}) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export const updateTask = async (id: number, task: {
  title: string;
  description: string;
  status: string;
  priority: number;
}) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const addTagToTask = async (taskId: number, tagId: number) => {
  const response = await api.post(`/tasks/${taskId}/tags`, { tagId });
  return response.data;
};

export const removeTagFromTask = async (taskId: number, tagId: number) => {
  const response = await api.delete(`/tasks/${taskId}/tags/${tagId}`);
  return response.data;
};