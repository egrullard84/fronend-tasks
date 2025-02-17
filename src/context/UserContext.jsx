import {createContext, useContext, useState} from 'react'

const UserContext = createContext();

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Error en el contexto de usuario");
  }
  return context;
};

const UserProvider = ({children}) => {

  const [user, setUser] = useState([]);
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}