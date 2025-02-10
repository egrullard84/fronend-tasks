import axios from "./axios";

//const API = 'http://localhost:3000/api/auth'

export const registerRequest = (user) => axios.post(`/register`, user);
export const loginRequest = (user) => axios.post(`/login`, user);
export const verifyTokenRequest = (token) =>
  axios.get(`/verifyToken`, {
    headers: {
        Authorization: `Bearer ${token}`
      }
  });
