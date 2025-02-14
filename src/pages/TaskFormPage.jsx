import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { addTask, getTaskById, updateTask } = useTasks();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadTask = async () => {
      if (id) {
        const task = await getTaskById(id);
        setValue("name", task.name);
      }
    };
    loadTask();
  }, []);
  return (
    <div className="form-container">
      <h2>Register Task</h2>
      <form
        onSubmit={handleSubmit(async (value) => {
          const task = { ...value, userId: user.id };
          if (id) {
            await updateTask(id, task);
          } else {
            await addTask(task);
          }

          navigate("/tasks");
        })}
      >
        <input
          type="text"
          placeholder="text"
          className="input"
          {...register("name", { required: true })}
        />
        <button type="submit" className="button">
          add task
        </button>
      </form>
    </div>
  );
};
