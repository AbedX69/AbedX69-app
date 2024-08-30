import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        setMessage('Sign in successful!');
        
        // Redirect to WelcomePage after successful sign-in
        setTimeout(() => {
          navigate('/'); // Assuming '/' routes to the WelcomePage
        }, 200); // Redirect after 200 milliseconds
      }
    } catch (error) {
      console.error('Error during sign-in:', error.response || error.message);
      setMessage(error.response?.data?.message || 'Error signing in.');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Sign In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignIn;
