import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {

    const { register, handleSubmit } = useForm();
    const { signup,isAutenticated } = useAuth();
    const navegate = useNavigate();
  
    useEffect(()=>{
      if(isAutenticated) navegate('/home')
    },[isAutenticated])


  return (
    <form
    onSubmit={handleSubmit(async (value) => {
      signup(value);
    })}
  >
    <input
      type="text"
      placeholder="name"
      {...register("name", { required: true })}
    />
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
    <button type="submit">register</button>
  </form>
  )
}

export default RegisterForm