import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import "./Navbar.css";
import { ThemeToggle } from "../ThemeToggle";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <header>
      <Link className="siteLogo" to="/">
        <img src={Logo} alt="Fokus Logo"></img>
        <h1>FOKUS</h1>
      </Link>
      <nav className="nav">
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          About
        </NavLink>
        {user ? (
          <NavLink
            to="/host"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Host
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Login
          </NavLink>
        )}

        <div className="themeToggle">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
