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
      navigate('/ProductPage', { state: { userID } });
    }
  };

  const handleMyOrders = () => {
    if (userID === 'guest') {
      navigate('/signin');
    } else {
      navigate('/ProductPage', { state: {userID } });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <header className="header">
      {/* Left section for signing dropdown */}
      {userID === 'guest' && (
        <div className="nav-left">
          <div className="signing-dropdown">
            <button className="dropbtn-signing pulse">
              Signing ▼
            </button>
            <div className="dropdown-content">
              <Link to="/signin">Sign In</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      )}

      {/* Center the store name with pulse animation */}
      <h1
        className="app-title pulse no-select"
        onClick={() => navigate('/')}
      >AbedX69</h1>

      {/* Right-side dropdown for users when logged in */}
      {userID !== 'guest' && (
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
      )}
    </header>
  );
};

export default Header;
