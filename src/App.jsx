import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/AuthContext";
import {ProtectedRoute} from "./components/ProtectedRoute";
import { TaskPage } from "./pages/TaskPage";
import { TaskProvider } from "./context/TaskContext";

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/tasks" element={<TaskPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
