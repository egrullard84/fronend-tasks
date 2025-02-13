import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../components/form.css';
const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { signin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="form-container">
       <h2>Iniciar Sesión</h2>
      <form
        onSubmit={handleSubmit(async (value) => {
          signin(value);
        })}
      >
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
        <button type="submit" className="button">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
