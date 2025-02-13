import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const TaskFormPage = () => {
   const {register,handleSubmit }= useForm() 
   const {addTask}= useTasks();
   const {user}= useAuth();
   const navigate = useNavigate();
  return (
    <div className="form-container">
    <h2>Register Task</h2>
   <form
     onSubmit={handleSubmit(async (value) => {
        const task= {...value, userId: user.id}
        addTask(task);
        navigate("/tasks");
     })}
   >
     <input
       type="text"
       placeholder="text"
       className="input" 
       {...register("name", { required: true })}
     />
     <button type="submit" className="button">add task</button>
   </form>
 </div>
  )
}
