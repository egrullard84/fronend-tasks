import { createContext, useContext, useState } from "react";
import { getSharesByTaskRequest,createUserShareRequest, deleteUserShareRequest} from "../api/share";

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
      console.log(response.data)
      setShares(response.data || []);
    } catch (error) {
      console.error("Error al obtener shares:", error);
    }
  };

  const createUserShare =  async (share)=>{
    const response = await createUserShareRequest(share);
    setShares(response.data)
  }
  const deleteUserShare =  async (userId)=>{
    const response = await deleteUserShareRequest(userId);
    console.log(response.data);
    //setShares(response.data)
  }

  return (
    <ShareContext.Provider value={{ shares,setShares, getAllSharesByTask,createUserShare,deleteUserShare }}>
      {children}
    </ShareContext.Provider>
  );
};
