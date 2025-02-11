import axios from "./axios";

//const API = 'http://localhost:3000/api/auth'

export const registerRequest = (user) => axios.post(`auth/register`, user);
export const loginRequest = (user) => axios.post(`auth/login`, user);
export const verifyTokenRequest = (token) =>
  axios.get(`auth/verifyToken`, {
    headers: {
        Authorization: `Bearer ${token}`
      }
  });
