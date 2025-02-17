import { createContext, useContext, useState } from "react";
import { getSharesByTaskRequest } from "../api/share";

const ShareContext = createContext();

export const useShares = () => {
  const context = useContext(ShareContext);
  if (!context) {
    throw new Error("Error en el contexto de shares");
  }
  return context;
};

export const ShareProvider = ({ children }) => {
  const [shares, setShares] = useState([]);

  const getAllSharesByTask = async (taskId) => {
    try {
      const response = await getSharesByTaskRequest(taskId);
      setShares(response.data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  return (
    <ShareContext.Provider value={{ shares, getAllSharesByTask }}>
      {children}
    </ShareContext.Provider>
  );
};
