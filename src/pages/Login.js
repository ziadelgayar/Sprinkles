import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

const LoginOrSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extract role from query parameters
  const role = new URLSearchParams(location.search).get('role');

  // Hardcoded users
  const users = [
    { username: 'faculty1', password: 'pass123', role: 'faculty' },
    { username: 'student1', password: 'pass123', role: 'student' },
    { username: 'company1', password: 'pass123', role: 'company' },
    { username: 'prostudent1', password: 'pass123', role: 'PROstudent' },
    { username: 'scad1', password: 'pass123', role: 'scad' },
  ];

  useEffect(() => {
    if (!role) {
      alert('Invalid role!');
      navigate('/');
    }
  }, [role, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.username === username && u.password === password && u.role === role
    );

    if (user) {
      console.log('Logged in as:', user.username);

      // Redirect based on role
      switch (role) {
        case 'faculty':
          navigate('/faculty/home');
          break;
        case 'student':
          navigate('/student/home');
          break;
        case 'company':
          navigate('/company/home');
          break;
        case 'PROstudent':
          navigate('/PROstudent/home');
          break;
        case 'scad':
          navigate('/scad/home');
          break;
        default:
          alert('Unknown role!');
      }
    } else {
      alert('Invalid credentials for selected role.');
    }
  };

  const handleSignupRedirect = () => {
    // Navigate to the CompanySignup page
    navigate('/signup/company');
  };

  return (
    <div className="login-container">
      <h2>Login or Sign Up</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Continue</button>
      </form>

      {role === 'company' && (
        <div className="signup-link">
          <p>Don't have an account?</p>
          <button onClick={handleSignupRedirect}>Sign Up Instead</button>
        </div>
      )}
    </div>
  );
};

export default LoginOrSignup;
