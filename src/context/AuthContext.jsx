import { useContext, useState, useEffect, createContext } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Error en el context");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    const response = await registerRequest(user);
    setUser(response.data);
    setIsAuthenticated(true);
  };

  const signin = async (user) => {
    const response = await loginRequest(user);
    setUser(response.data);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Ahora loading se actualiza correctamente al final
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signup, signin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
