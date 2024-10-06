import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext.jsx'; // Import the UserContext
import './Auth.css';

const Signup = () => {
  const { login } = useContext(UserContext); // Use the login function from UserContext
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      // Register the user
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        // After successful registration, automatically sign in the user
        const signInResponse = await axios.post('http://localhost:5000/api/users/signin', {
          email,
          password,
        });

        if (signInResponse.status === 200) {
          const { userID, name } = signInResponse.data;
          login(name, userID); // Update context state with logged-in user data
          setMessage('User registered and signed in successfully!');
          
          setTimeout(() => {
            navigate('/'); // Navigate to the Welcome Page
          }, 200);
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error registering user.');
    }
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-btn animated-btn">Sign Up</button>
        {message && <p className="message">{message}</p>}
      </form>
      <p className="auth-switch">
        Already have an account? <button onClick={handleSignIn} className="switch-btn">Sign In</button>
      </p>
    </div>
  );
};

export default Signup;
