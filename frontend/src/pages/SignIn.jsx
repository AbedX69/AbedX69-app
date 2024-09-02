// frontend/src/pages/SignIn.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext.jsx'; // Correct import

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
        const { userID, name } = response.data;
        login(name, userID); // Update the context with the user info

        setMessage('Sign in successful!');

        setTimeout(() => {
          navigate('/'); // Redirect to the WelcomePage
        }, 200);
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
