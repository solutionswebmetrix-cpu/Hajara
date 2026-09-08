import { Link } from 'react-router-dom'
import './Login.css'

const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-container glass-card">
        <h1 className="auth-title">Create Account</h1>
        <form className="auth-form">
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <button type="submit" className="btn-primary">Sign Up</button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
