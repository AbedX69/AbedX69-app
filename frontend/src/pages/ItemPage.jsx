import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext'; // Get user context for checking sign-in status
import './ItemPage.css'; // Custom styles

const ItemPage = () => {
  const { productID } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0); // For the image carousel
  const { userID } = useContext(UserContext); // Check if the user is signed in
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${productID}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productID]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleImageClick = (index) => {
    setActiveImage(index); // Update the active image when user clicks on a thumbnail
  };

  const handleBuyNow = () => {
    if (userID === 'guest') {
      navigate('/signin'); // Redirect to sign-in if not signed in
    } else {
      navigate(`/order/${productID}`); // Navigate to the ordering page
    }
  };

  return (
    <div className="item-page-container">
      <div className="item-images-section">
        <div className="main-image-container">
          <img
            src={`http://localhost:5000/${product.images[activeImage]}`}
            alt={product.productName}
            className="item-main-image"
          />
        </div>
        <div className="item-thumbnails">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/${image}`}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${index === activeImage ? 'active' : ''}`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      </div>
      <div className="item-details-section">
        <h1 className="product-title">{product.productName}</h1>
        <p className="item-price">${product.price}</p>
        <p className="item-description">{product.description}</p>
        
        {userID !== 'guest' && (
          <button className="buy-now-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemPage;
