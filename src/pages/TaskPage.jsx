import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import "../components/task.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TaskPage = () => {
  const { tasks, deleteTask,getTasksByUser } = useTasks();
  const {user}=  useAuth();


  useEffect(() => {
    const fetchTasks = async () => {
      await getTasksByUser(user.id);
    };
    fetchTasks();
  }, []);

  return (
    <div className="task-container">
      {tasks.length === 0 ? (
        <p className="no-tasks">No hay tareas disponibles</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h2 className="task-title">{task.name}</h2>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
            <Link to={`/tasks/${task.id}`} className="edit-btn">Edit</Link>
    
          </div>
        ))
      )}
    </div>
  );
};

export default TaskPage;
