import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { TaskProvider } from "./context/TaskContext";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { TaskFormPage } from "./pages/TaskFormPage";
import TaskPage from "./pages/TaskPage";
import { SharePage } from "./pages/SharePage";
import { ShareProvider } from "./context/ShareContext";
import { UserPage } from "./pages/UserPage";

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <ShareProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/tasks" element={<TaskPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/shares/:taskId" element={<SharePage />} />
                <Route path="/shares/user/:taskId" element={<UserPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ShareProvider>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
