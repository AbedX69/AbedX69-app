import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.css'; // Add CSS for styling

const ProductPage = () => {
  const { state } = useLocation();
  const { filter, userID, category } = state || {};
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (filter === 'myProducts') {
          response = await axios.get(`/api/products?sellerID=${userID}`);
        } else if (filter === 'myOrders') {
          const ordersResponse = await axios.get(`/api/orders?buyerID=${userID}`);
          const orderProductIDs = ordersResponse.data.map(order => order.productID);
          response = await axios.get(`/api/products?ids=${orderProductIDs.join(',')}`);
        } else if (filter === 'category') {
          response = await axios.get(`/api/products?category=${category}`);
        } else {
          response = await axios.get('/api/products');
        }
        setProducts(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [filter, userID, category]);

  return (
    <div className="product-page">
      {error ? (
        <p>Error fetching products: {error.message}</p>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div key={product.productID} className="product-card">
              <img 
                src={`http://localhost:5000/${product.images[0]}`} 
                alt={product.productName} 
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.productName}</h3>
                <p className="product-price">${product.price}</p>
                <p className="product-seller">Sold by: {product.sellerName}</p> {/* Add seller name */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
