import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const { signin } = useAuth();
   
  return (
    <form
    onSubmit={handleSubmit(async (value) => {
      signin(value);
    })}
  >
  
    <input
      type="email"
      placeholder="email"
      {...register("email", { required: true })}
    />
    <input
      type="password"
      placeholder="password"
      {...register("password", { required: true })}
    />
    <button type="submit">login</button>
  </form>
  )
}

export default LoginForm