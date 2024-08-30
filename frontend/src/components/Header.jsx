import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ isSignedIn, userName }) {
  return (
    <div className="header">
      <div className="header-left">
        {isSignedIn ? (
          <div className="profile-info">
            <span>Welcome, {userName}</span>
          </div>
        ) : (
          <Link to="/signin">
            <button className="button">Sign In / Sign Up</button>
          </Link>
        )}
      </div>
      <div className="header-center">
        <Link to="/">
          <img src="/path-to-your-logo/logo.png" alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="header-right">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="button">🔎</button>
      </div>
      <hr />
    </div>
  );
}

export default Header;
