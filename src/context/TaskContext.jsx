import { createContext, useContext, useState } from "react";
import {
  addTaskRequest,
  deleteTaskRequest,
  getTaskByUserRequest,
  getTasksRequest,
} from "../api/task";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("Error en el contexto de tareas");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = async (task) => {
    try {
      const response = await addTaskRequest(task);
      const newTask = { ...response.data}; //s Asigna un ID si falta
  
      setTasks((prevTasks) => {
        // Verifica si la tarea ya existe por ID o nombre
        if (prevTasks.some((t) => t.id === newTask.id || t.name === newTask.name)) {
          alert('ya existe una tarea con ese nombre o ID');
          return;
        }
        return [...prevTasks, newTask]; // Agregar solo si es única
      });
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };
  

  const getTasks = async () => {
    try {
      const response = await getTasksRequest();
      setTasks(response.data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const getTasksByUser = async (id) => {
    try {
      const response = await getTaskByUserRequest(id);
      setTasks(response.data);
    } catch (error) {
      console.error("Error al obtener tareas del usuario:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskRequest(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, getTasks, getTasksByUser }}
    >
      {children}
    </TaskContext.Provider>
  );
};
