import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });

      console.log('Response data:', response.data); // Log the response data

      setMessage('User registered successfully!');
      
      // Redirect to sign-in page after successful signup
      setTimeout(() => {
        navigate('/signin');
      }, 200); // Redirect after 2 seconds

    } catch (error) {
      console.error('Error during registration:', error.response || error.message);
      setMessage(error.response?.data?.message || 'Error registering user.');
    }
  };

  const handleSignIn = () => {
    navigate('/signin'); // Navigate to the sign-in page
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={handleSignIn}>Already have an account? Sign In</button> {/* New button */}
    </div>
  );
};

export default Signup;
