import { createContext, useContext, useState } from "react";
import {
  addTaskRequest,
  deleteTaskRequest,
  getTaskByUserRequest,
  getTasksRequest,
  getTaskByIdRequest,
  updateTaskRequest, // Importar la función de actualización
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
      const taskExists = tasks.some(
        (t) => t.name.trim().toLowerCase() === task.name.trim().toLowerCase()
      );

      if (taskExists) {
        alert("⚠️ Ya existe una tarea con ese nombre.");
        return;
      }

      const response = await addTaskRequest(task);
      const newTask = { ...response.data };

      if (!newTask.id) {
        console.error("🚨 La API no devolvió un ID para la nueva tarea.");
        return;
      }

      setTasks((prevTasks) => [...prevTasks, newTask]);
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

  const getTaskById = async (id) => {
    try {
      const response = await getTaskByIdRequest(id);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la tarea por ID:", error);
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

  const updateTask = async (id, updatedTask) => {
    try {
  console.log(updatedTask);
      const response = await updateTaskRequest(id, updatedTask);
      const updatedTaskData = response.data;

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...updatedTaskData } : task
        )
      );
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        getTasks,
        getTasksByUser,
        getTaskById,
        updateTask, // Agregamos la función de actualización al contexto
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
