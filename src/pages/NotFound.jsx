import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">Page Not Found</p>
        <Link to="/" className="btn-primary">Go Home</Link>
      </div>
    </div>
  )
}

export default NotFound
