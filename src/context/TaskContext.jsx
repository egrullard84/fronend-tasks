import { createContext, useContext, useState } from "react";
import { addTaskRequest, getTaskByUserRequest, getTasksRequest } from "../api/task";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("Error en el context");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = async (task) => {
    const resposne = await addTaskRequest(task);
    console.log(resposne);
  };
  const getTasks = async () => {
    const response = await getTasksRequest();
    console.log(response.data);
    setTasks(response.data);
  };

  const getTasksByUser = async (id) => {
   const response = await getTaskByUserRequest(id);
   setTasks(response.data);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, getTasks,getTasksByUser }}>
      {children}
    </TaskContext.Provider>
  );
};
