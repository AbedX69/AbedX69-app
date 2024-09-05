import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext.jsx";
import "./CreateProduct.css";
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const { userID } = useContext(UserContext);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userID === "guest") {
      setMessage("Please sign in to create a product.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("sellerID", userID); // Assign seller ID

    // `images` must match the field name used in the Multer configuration
    images.forEach((image, index) => {
      formData.append("images", image); // Use the correct field name for multiple files
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setMessage("Product created successfully!");
        setProductName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setImages([]);
        
        setTimeout(() => {
          navigate('/'); // Redirect to the WelcomePage
        }, 350);
        
      }
    } catch (error) {
      console.error("Error creating product:", error.response || error.message);
      setMessage("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="create-product-container">
      <h2>Create a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Sports">Sports</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Books">Books</option>
            <option value="Toys">Toys</option>
            <option value="Beauty">Beauty</option>
            <option value="Automotive">Automotive</option>
          </select>
        </div>
        <div className="form-group">
          <label>Product Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateProduct;
