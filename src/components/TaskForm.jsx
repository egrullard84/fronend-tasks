import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";

export const TaskForm = () => {

  const { register, handleSubmit } = useForm();
  const { addTask} = useTasks();
  const {user} = useAuth();

  return (
    <form
      onSubmit={handleSubmit(async (value) => {
        const task = {...value, userId: user.id}
        addTask(task);
      })}
    >
      <input
        type="text"
        placeholder="description"
        {...register("name", { required: true })}
      />
      <button type="submit">add</button>
    </form>
  );
};
