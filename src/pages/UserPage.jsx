import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../components/UserPage.css"; // Importa el archivo CSS
import { useShares } from "../context/ShareContext";
import { useParams } from "react-router-dom";

export const UserPage = () => {
  const { users, getAllUsers } = useAuth();
  const { createUserShare, deleteUserShare, shares, setShares, message } =
    useShares();
  const { taskId } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      await getAllUsers();
    };
    fetchUsers();
  }, [taskId]);

  const handleAddUser = async (userId) => {
    const newShare = {
      taskId,
      userId,
    };
    try {
      const addedShare = await createUserShare(newShare);
    //   await createUserShare(newShare);
      setShares([...shares, addedShare]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserShare(userId);
      alert("user deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Users</h1>
      {message}
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <p className="user-email">{user.email}</p>
            <button className="add-btn" onClick={() => handleAddUser(user.id)}>
              Add
            </button>
            <button
              className="add-btn"
              onClick={() => handleDeleteUser(user.id)}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
