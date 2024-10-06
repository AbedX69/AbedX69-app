import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './ProductPage.css';

const ProductPage = () => {
  const { state } = useLocation();
  const { userID, category, isBuyer } = state || {};
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCardClick = (product) => {
    navigate(`/product/${product.productID}`); // Navigate to ItemPage with productID
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        
        // Fetch products based on userID or category
        if (isBuyer && userID) {
          // Fetch products based on orders for the current buyer
          response = await axios.get(`/api/orders/ordered-products/${userID}`);
        } else if (userID) {
          // Fetch products based on the seller's ID
          response = await axios.get(`/api/products?sellerID=${userID}`);
        } else if (category) {
          // Fetch products based on the category
          response = await axios.get(`/api/products?category=${category}`);
        }

        setProducts(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [userID, category, isBuyer]);

  return (
    <div className="product-page">
      {error ? (
        <p>Error fetching products: {error.message}</p>
      ) : (
        <div className="product-grid">
          {products.length === 0 ? (
            <h1>No products yet</h1>
          ) : (
            products.map(product => (
              <div key={product._id} className="product-card" onClick={() => handleCardClick(product)}>
                <img 
                  src={`http://localhost:5000/${product.images ? product.images[0] : 'default.jpg'}`} 
                  alt={product.productName} 
                  className="product-image" 
                />
                <div className="product-info">
                  <h3>{product.productName}</h3>
                  <p className="product-price">${product.price}</p>
                  <p className="product-seller">Sold by: {product.sellerName || product.sellerID}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPage;