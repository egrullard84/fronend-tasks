import axios from "./axios";

//const API = 'http://localhost:3000/api/auth'

export const getUsersRequest = () => axios.get(`auth/users`);
export const registerRequest = (user) => axios.post(`auth/register`, user);
export const loginRequest = (user) => axios.post(`auth/login`, user);
export const verifyTokenRequest = (token) =>
  axios.get(`auth/verifyToken`, {
    headers: {
        Authorization: `Bearer ${token}`
      }
  });
export const getUserShareByTaskRequest = (taskId) => axios.get(`/tasks/${taskId}`);
