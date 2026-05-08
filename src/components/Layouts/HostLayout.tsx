import { NavLink, Outlet } from 'react-router-dom'
import "../Header/Header.css"

export default function HostLayout() {

    return (
    <>
      <nav className='nav layoutnav'>
        <NavLink to="." 
        end
          className={({ isActive }) => isActive ? "active-link" : ""}>
          Dashboard
        </NavLink>
        <NavLink to="tasks"
          className={({ isActive }) => isActive ? "active-link" : ""}>
          Tasks
        </NavLink>
        <NavLink to="settings"
          className={({ isActive }) => isActive ? "active-link" : ""}>
          Settings
        </NavLink>
      </nav>
      <Outlet />
    </>
  )
}
