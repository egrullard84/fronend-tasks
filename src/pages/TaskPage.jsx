import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import "../components/task.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TaskPage = () => {
  const { tasks, deleteTask, getTasksByUser } = useTasks();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      if (user?.id) {
        await getTasksByUser(user.id);
      }
    };
    fetchTasks();
  }, [user]);

  console.log("Tasks data:", tasks); // 🔍 Verifica qué datos llegan

  return (
    <div className="task-container">
      {!tasks || !Array.isArray(tasks.tasks) || !Array.isArray(tasks.sharedTasks) ? (
        <p className="no-tasks">No hay tareas disponibles</p>
      ) : (
        <>
          {/* Tareas Propias */}
          {tasks.tasks.length > 0 ? (
            tasks.tasks.map((task) => (
              <div key={task.id} className="task-card">
                <h2 className="task-title">{task.name} (Propia)</h2>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
                <Link to={`/tasks/${task.id}`} className="edit-btn">Edit</Link>
                <Link to={`/shares/${task.id}`} className="share-btn">Share</Link>
              </div>
            ))
          ) : (
            <p className="no-tasks">No tienes tareas propias.</p>
          )}

          {/* Tareas Compartidas */}
          {tasks.sharedTasks.length > 0 ? (
            tasks.sharedTasks.map((task) => (
              <div key={task.id} className="task-card shared-task">
                <h2 className="task-title">{task.name} (Compartida)</h2>
              </div>
            ))
          ) : (
            <p className="no-tasks">No tienes tareas compartidas.</p>
          )}
        </>
      )}
    </div>
  );
};

export default TaskPage;
