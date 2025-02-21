import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../components/Navbar.css';

export const Navbar = () => {
  const { isAuthenticated,logout,user } = useAuth();
  return (
    <nav className="navbar">

    <Link to="/tasks">
    <h1 className="title">Task App</h1>
    </Link>
    <ul className="nav-links">
      {isAuthenticated ? (
        <>
        <li className="welcome-text">
  Welcome, {user.name}
  <span className="notification-badge">0</span> {/* Número de notificaciones */}
</li>
          
          <li>
            {/*<button className="add-btn">Add Task</button> */}
            <Link to="/add-task" className="add-btn">Add Task</Link>
          </li>
  
          <li>
            <button className="logout-btn" onClick={logout}>Salir</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login" className="nav-item">Login</Link>
          </li>
          <li>
            <Link to="/register" className="nav-item">Register</Link>
          </li>
        
        </>
      )}
    </ul>
  </nav>
  );
};
