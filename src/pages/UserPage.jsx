import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../components/UserPage.css"; // Importa el archivo CSS

export const UserPage = () => {
  const { users, getAllUsers } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      await getAllUsers();
    };
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Users</h1>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <p className="user-email">{user.email}</p>
            <button className="add-btn" onClick={() => console.log(user.id)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
