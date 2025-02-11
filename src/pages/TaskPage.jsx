import { TaskForm } from "../components/TaskForm";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export const TaskPage = () => {
  const { user, loading } = useAuth();
  const { getTasksByUser, tasks } = useTasks();

  useEffect(() => {
    if (user) {
      getTasksByUser(user.id);
    }
  }, [user]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Task Page</h1>
      <TaskForm />
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <h2>{task.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
