import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css'; // This is where the styling is applied

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate('/ProductPage', { state: { category } });
  };
  

  return (
    <div className="welcome-container">
      <div className="circle-div" id="Electronics" onClick={() => handleCategoryClick('Electronics')}>
        <span>Electronics</span>
      </div>
      <div className="circle-div" id="Clothing" onClick={() => handleCategoryClick('Clothing')}>
        <span>Clothing</span>
      </div>
      <div className="circle-div" id="Jewelry" onClick={() => handleCategoryClick('Jewelry')}>
        <span>Jewelry</span>
      </div>
      <div className="circle-div" id="Sports" onClick={() => handleCategoryClick('Sports')}>
        <span>Sports</span>
      </div>
      <div className="circle-div" id="Home Appliances" onClick={() => handleCategoryClick('Home Appliances')}>
        <span>Home Appliances</span>
      </div>
      <div className="circle-div" id="Books" onClick={() => handleCategoryClick('Books')}>
        <span>Books</span>
      </div>
      <div className="circle-div" id="Toys" onClick={() => handleCategoryClick('Toys')}>
        <span>Toys</span>
      </div>
      <div className="circle-div" id="Beauty" onClick={() => handleCategoryClick('Beauty')}>
        <span>Beauty</span>
      </div>
      <div className="circle-div" id="Automotive" onClick={() => handleCategoryClick('Automotive')}>
        <span>Automotive</span>
      </div>
    </div>
  );
};

export default WelcomePage;
