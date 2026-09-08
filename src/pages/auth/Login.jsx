import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-container glass-card">
        <h1 className="auth-title">Welcome Back</h1>
        <form className="auth-form">
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
