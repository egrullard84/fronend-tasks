import { createContext, useContext, useState } from "react";
import {
  getSharesByTaskRequest,
  createUserShareRequest,
  deleteUserShareRequest,
} from "../api/share";

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
  const [message, setMessage] = useState("");

  const getAllSharesByTask = async (taskId) => {
    try {
      const response = await getSharesByTaskRequest(taskId);
      setShares(response.data || []);
    } catch (error) {
      console.error("Error al obtener shares:", error);
    }
  };

  const createUserShare = async (share) => {

    try {
      const response = await createUserShareRequest(share);
      if (response.data.success) {
        setShares((prevShares) => [...prevShares, response.data.data]);
        setMessage(response.data.message)
      } else {
        setMessage(response.data.message)
      }
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
    }
  };

  const deleteUserShare = async (userId) => {
    const response = await deleteUserShareRequest(userId);
    console.log(response.data);
    setShares(response.data)
  };

  return (
    <ShareContext.Provider
      value={{
        shares,
        setShares,
        getAllSharesByTask,
        createUserShare,
        deleteUserShare,
        message
      }}
    >
      {children}
    </ShareContext.Provider>
  );
};
