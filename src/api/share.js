import axios from "./axios";
export const getSharesByTaskRequest = (taskId) => axios.get(`shares/${taskId}`);