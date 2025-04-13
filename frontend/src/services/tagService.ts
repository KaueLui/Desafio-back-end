import api from "./api";

export const createTag = async (tag: { name: string; color: string }) => {
  const response = await api.post("/tags", tag);
  return response.data;
};

export const getTags = async () => {
  const response = await api.get("/tags");
  return response.data;
};

export const deleteTag = async (id: number) => {
  const response = await api.delete(`/tags/${id}`);
  return response.data;
};

export const updateTag = async (id: number, tag: { name: string; color: string }) => {
  const response = await api.put(`/tags/${id}`, tag);
  return response.data;
};