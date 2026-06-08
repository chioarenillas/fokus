import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function HostLayout() {
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate("/login", {replace: true});
  }

  return (
    <>
    <div className="nav layoutnav hostlayout">
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
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>

      <Outlet />
    </>
  );
}
