import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Host/Dashboard";
import Settings from "./pages/Host/Settings";
import Register from "./pages/Register";
import Tasks from "./pages/Host/Tasks";
import HostLayout from "./components/HostLayout";

export default function App() {
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
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </Route>
    </Routes>
  );
}
