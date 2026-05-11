import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Host/Dashboard/Dashboard";
import Settings from "./pages/Host/Settings/Settings";
import Register from "./pages/Login/Register";
import Tasks from "./pages/Host/Tasks/Tasks";
import HostLayout from "./components/Layouts/HostLayout";
import { useTasksFirebase } from "./useTasksFirebase";

export default function App() {
  const tasksProps = useTasksFirebase()
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        {/* protected area */}
        <Route
          path="/host"
          element={
            <ProtectedRoute>
              <HostLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard {...tasksProps} />} />
          <Route path="tasks" element={<Tasks {...tasksProps}  />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}
