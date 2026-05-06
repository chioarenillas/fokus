import { NavLink, Outlet } from 'react-router-dom'

export default function HostLayout() {

    return (
    <>
      <nav className='host-nav'>
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
