import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../Header/Header.css";

export default function HostLayout() {
  const navigate = useNavigate();

  function fakeLogOut() {
    localStorage.removeItem("loggedin");
    navigate("/login");
  }

  return (
    <>
    <div className="nav layoutnav">
      <nav >
        <NavLink
          to="."
          end
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="tasks"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Tasks
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Settings
        </NavLink>
      </nav>

      <div className="logout-button">
        <button onClick={fakeLogOut}>Log Out</button>
      </div>
    </div>

      <Outlet />
    </>
  );
}
