import axios from "./axios";

export const getTasksRequest = () => axios.get(`tasks`);
export const getTaskByUserRequest = (id) => axios.get(`/tasks/${id}`);
export const addTaskRequest = (task) => axios.post(`/task`, task);
export const updateTaskRequest = (task) => axios.put(`/tasks/${task.id}`, task);
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`);