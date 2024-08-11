import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';  // Make sure to style the component using a separate CSS file.
import forkimage from '../images/tasktreefork.png'
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation (You can replace this with more complex logic or form validation libraries)
    if (!username || !password) {
      setError('Please fill in both fields');
      return;
    }

    // Replace with your authentication logic
    if (username === 'admin' && password === 'password') {
      // Navigate to home screen after successful login
      navigate('/home');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <img src={forkimage} alt="forkimage" className='forkimage' />
      <h1>TASKTREE</h1>
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="login-button">Sign in</button>
          </form>
          <p>Don't have an account? <Link to='/signup' style={{textDecoration: 'none'}}><span>Sign Up</span></Link></p>
          <Link to='/home' className='guest-link'>Continue as a guest</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
