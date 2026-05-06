import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className='notFoundContainer'>
      <h1>Sorry , the page you were looking for was not found.</h1>
      <Link to="/" className="button">Return to home</Link>
    </div>
  )
}
