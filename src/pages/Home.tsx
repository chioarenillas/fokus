import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='homeContainer'>
      <div className='overlayTop'>
      <h1>Organize your tasks in a simple, visual way</h1>
      <p>Fokus is a task management app that helps you plan,
        organize, and complete your work without chaos.</p>
        </div>
      <div className='overlayBottom'>
        <h3>Keep everything under control in one place.</h3>
      <Link to="login" className='button'>Get started</Link>
      </div>
    </div>
  )
}
