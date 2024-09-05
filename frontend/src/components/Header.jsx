// frontend/src/components/Header.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext.jsx';
import './header.css';

const Header = () => {
  const { userName, userID, logout } = useContext(UserContext); // Use context
  const navigate = useNavigate();

  const handleSellProduct = () => {
    if (userID === 'guest') {
      navigate('/signin');
    } else {
      navigate('/sell-product');
    }
  };  
  const handleMyProducts = () => {
    if (userID === 'guest') {
      navigate('/signin');
    } else {
      navigate('/ProductPage');
    }
  }; 
   const handleMyOrders = () => {
    if (userID === 'guest') {
      navigate('/signin');
    } else {
      navigate('/ProductPage');
    }
  };
  const handleLogout = () => {
    logout(); // Perform the logout
    navigate('/'); // Navigate to the welcome page
  };

  return (
    <header className="header">
      <h1 className="app-title">My Application</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/signin">Sign In</Link>
      </nav>
      <div className="user-dropdown">
        <button className="dropbtn">
          Welcome, {userName} ▼
        </button>
        <div className="dropdown-content">
          <button onClick={handleMyProducts}>My Products</button>
          <button onClick={handleMyOrders}>My Orders</button>

          <button onClick={handleSellProduct}>Sell a Product</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
