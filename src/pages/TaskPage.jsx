import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import "../components/task.css";
import { Link } from "react-router-dom";

const TaskPage = () => {
  const { tasks, getTasks, deleteTask } = useTasks();

  useEffect(() => {
    getTasks();
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
