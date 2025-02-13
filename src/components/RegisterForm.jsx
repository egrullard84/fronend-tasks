import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="form-container">
    <h2>Register</h2>
      <form
        onSubmit={handleSubmit(async (value) => {
          signup(value);
        })}
      >
        <input
          type="text"
          placeholder="name"
          className="input" 
          {...register("name", { required: true })}
        />
        <input
          type="email"
          placeholder="email"
          className="input" 
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="password"
          className="input" 
          {...register("password", { required: true })}
        />
        <button type="submit" className="button">register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
