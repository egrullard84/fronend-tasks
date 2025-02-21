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
      const taskExists = Array.isArray(tasks) ? tasks.some(
        (t) => t.name.trim().toLowerCase() === task.name.trim().toLowerCase()
      ) : false;

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
     //setTasks((prevTasks) => [...prevTasks, newTask]);
     setTasks((prevTasks) => Array.isArray(prevTasks) ? [...prevTasks, newTask] : [newTask]);
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  const getTasks = async () => {
    try {
      const response = await getTasksRequest();
      console.log(response.data);
    //  setTasks(response.data);
    setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const getTasksByUser = async (id) => {
    try {
      const response = await getTaskByUserRequest(id);
  
      // Verificar si response.data tiene la estructura correcta
      if (!response.data || typeof response.data !== "object") {
        console.error("Error: La API no devolvió un objeto válido", response.data);
        setTasks({ tasks: [], sharedTasks: [] });
        return;
      }
  
      // Extraer tareas propias y compartidas
      const userTasks = Array.isArray(response.data.tasks) ? response.data.tasks : [];
      const sharedTasks = Array.isArray(response.data.sharedTasks) ? response.data.sharedTasks : [];
  
      // Actualizar el estado correctamente
      setTasks({ tasks: userTasks, sharedTasks: sharedTasks });
    } catch (error) {
      console.error("Error al obtener tareas del usuario:", error);
      setTasks({ tasks: [], sharedTasks: [] }); // Evita errores en el frontend si la petición falla
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
  
      setTasks((prevTasks) => {
        if (!prevTasks || typeof prevTasks !== "object") return { tasks: [], sharedTasks: [] };
  
        return {
          tasks: prevTasks.tasks.filter((task) => task.id !== id), // Filtrar en tareas propias
          sharedTasks: prevTasks.sharedTasks.filter((task) => task.id !== id), // Filtrar en tareas compartidas
        };
      });
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
