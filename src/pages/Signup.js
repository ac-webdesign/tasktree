import React, { useState } from 'react';
import axios from 'axios';
import '../styles/signup.css'
import { Link } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        email,
        username,
        password,
      });

      if (response.data.success) {
        alert('Signup successful! You can now log in.');
        // Redirect to login page or reset form
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-page">
        <h2>Sign Up</h2>
        <div className="signup-container">
          
          <div className="signup-card">
              {error && <p className="error">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <input
                    placeholder='Email'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    placeholder='Username'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
              
                  <input
                    placeholder='Password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    placeholder='Repeat Password'
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className='signup-button'>Sign Up</button>
              </form>
              <p>Already have an account? <Link to='/' style={{textDecoration: 'none'}}><span>Sign In</span></Link></p>

          </div>
        </div>
    </div>
  );
}

export default Signup;
