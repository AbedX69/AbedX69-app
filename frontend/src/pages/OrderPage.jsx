import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';
import './OrderPage.css';

const OrderPage = () => {
  const { productID } = useParams();
  const { userID, userName } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [cardNumber, setCardNumber] = useState(['', '', '', '']);
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
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

  const handleCardNumberChange = (index, value) => {
    const formattedValue = value.replace(/\D/g, ''); // Only allow numbers
    const newCardNumber = [...cardNumber];
    newCardNumber[index] = formattedValue.slice(0, 4); // Max 4 digits
    setCardNumber(newCardNumber);

    if (formattedValue.length === 4 && index < 3) {
      document.getElementById(`cardInput${index + 1}`).focus();
    }
  };

  const handleExpiryDateChange = (value) => {
    const formattedValue = value.replace(/\D/g, ''); // Only allow numbers
    let formattedDate = formattedValue;

    if (formattedValue.length >= 2) {
      formattedDate = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
    }

    setExpiryDate(formattedDate.slice(0, 5));

    if (formattedDate.length === 5) {
      document.getElementById('cvcInput').focus();
    }
  };

  const handleCvcChange = (value) => {
    const formattedValue = value.replace(/\D/g, ''); // Only allow numbers
    setCvc(formattedValue.slice(0, 3));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCardNumber = cardNumber.join('');

    try {
      const response = await axios.post('http://localhost:5000/api/orders/create', {
        buyerID: userID,
        productID,
        cardNumber: fullCardNumber,
        expiryDate,
        cvc,
      });

      if (response.status === 201) {
        alert('Order placed successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place the order. Please try again.');
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="order-page-container"
    >
      <h2>Complete Your Purchase</h2>
      <div className="order-content">
        <div className="product-section">
          <img
            src={`http://localhost:5000/${product.images[0]}`}
            alt={product.productName}
            className="product-image"
          />
          <h3>{product.productName}</h3>
          <p>{product.description}</p>
          <p className="price">${product.price}</p>
        </div>

        <div className="card-section">
          <div className="credit-card-container">
            {/* Front of the card */}
            <div className="credit-card card-front">
              <div className="card-chip"></div>
              <div className="card-number">
                {cardNumber.map((part, index) => (
                  <span key={index}>{part.padEnd(4, '•')}</span>
                ))}
              </div>
              <div className="card-name">{userName || 'CARDHOLDER NAME'}</div>
              <div className="expiry-date">{expiryDate || 'MM/YY'}</div>
            </div>

            {/* Back of the card */}
            <div className="credit-card card-back">
              <div className="magnetic-strip"></div>
              <div className="signature-strip">
                <span>{cvc || '•••'}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            <div className="card-input-group">
              <label>Card Number</label>
              <div className="card-number-inputs">
                {cardNumber.map((part, index) => (
                  <input
                    key={index}
                    id={`cardInput${index}`}
                    type="text"
                    maxLength="4"
                    value={part}
                    onChange={(e) => handleCardNumberChange(index, e.target.value)}
                    required
                  />
                ))}
              </div>
            </div>
            <div className="card-input-row">
              <div className="card-input">
                <label>Expiry Date</label>
                <input
                  id="expiryDateInput"
                  type="text"
                  value={expiryDate}
                  onChange={(e) => handleExpiryDateChange(e.target.value)}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </div>
              <div className="card-input">
                <label>CVC</label>
                <input
                  id="cvcInput"
                  type="text"
                  value={cvc}
                  onChange={(e) => handleCvcChange(e.target.value)}
                  maxLength="3"
                  required
                />
              </div>
            </div>
            <button type="submit" className="buy-now-btn">
              Confirm Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
