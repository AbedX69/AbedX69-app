import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext.jsx';
import './Auth.css'; // Import shared CSS for Signup and SignIn

const SignIn = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        const { userID, name, isAdmin } = response.data; // Extract isAdmin from response
        login(name, userID, isAdmin); // Pass isAdmin to login

        setMessage('Sign in successful!');
        setTimeout(() => {
          if (isAdmin) {
            navigate('/admin'); // Redirect to admin dashboard if the user is an admin
          } else {
            navigate('/'); // Regular users go to the welcome page
          }
        }, 200);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error signing in.');
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-btn animated-btn">Sign In</button>
        {message && <p className="message">{message}</p>}
      </form>
      <p className="auth-switch">
        Don’t have an account? <button onClick={handleSignUp} className="switch-btn">Sign Up</button>
      </p>
    </div>
  );
};

export default SignIn;
