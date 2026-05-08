import { Link, NavLink } from "react-router-dom";
import  Logo from "../../assets/Logo.png"
import "./Header.css"

export default function Header() {
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
          <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "login-active-link" : "")}
        >
          Login
        </NavLink>
      </nav>
    </header>
  );
}
