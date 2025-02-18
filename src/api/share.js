import axios from "./axios";
export const getSharesByTaskRequest = (taskId) => axios.get(`shares/${taskId}`);
export const createUserShareRequest = (share) => axios.post(`shares/`, share);
export const deleteUserShareRequest = (userId) => axios.delete(`shares/user/${userId}`);