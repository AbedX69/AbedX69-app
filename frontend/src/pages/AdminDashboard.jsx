import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext.jsx';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { isAdmin } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [editType, setEditType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!isAdmin) {
        navigate('/');
        return;
      }

      try {
        const config = { headers: { 'x-is-admin': 'true' } };
        const [usersResponse, productsResponse, ordersResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/users', config),
          axios.get('http://localhost:5000/api/admin/products', config),
          axios.get('http://localhost:5000/api/admin/orders', config),
        ]);

        setUsers(usersResponse.data);
        setProducts(productsResponse.data);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [isAdmin, navigate]);

  const handleDelete = async (id, type) => {
    try {
      const config = { headers: { 'x-is-admin': 'true' } };
      await axios.delete(`http://localhost:5000/api/admin/${type}/${id}`, config);
      if (type === 'users') setUsers(users.filter(user => user.userID !== id));
      if (type === 'products') setProducts(products.filter(product => product.productID !== id));
      if (type === 'orders') setOrders(orders.filter(order => order.orderID !== id));
    } catch (error) {
      console.error(`Failed to delete ${type}:`, error);
    }
  };

  const handleEdit = (item, type) => {
    setEditingItem(item);
    setEditType(type);
  };

  const saveEdit = async () => {
    try {
      const config = { headers: { 'x-is-admin': 'true' } };
      const idField = `${editType.slice(0, -1)}ID`; // Use the correct ID field name dynamically
      await axios.put(`http://localhost:5000/api/admin/${editType}/${editingItem[idField]}`, editingItem, config);

      if (editType === 'users') setUsers(users.map(user => (user.userID === editingItem.userID ? editingItem : user)));
      if (editType === 'products') setProducts(products.map(product => (product.productID === editingItem.productID ? editingItem : product)));
      if (editType === 'orders') setOrders(orders.map(order => (order.orderID === editingItem.orderID ? editingItem : order)));

      setEditingItem(null);
      setEditType('');
    } catch (error) {
      console.error('Failed to save edit:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="data-sections">
          {/* Users Section */}
          <section>
            <h2>Users</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Is Admin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={`user-${user.userID}`}>
                    <td>{user.userID}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(user, 'users')}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(user.userID, 'users')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Products Section */}
          <section>
            <h2>Products</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Seller ID</th>
                  <th>Seller Name</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={`product-${product.productID}`}>
                    <td>{product.productID}</td>
                    <td>{product.productName}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.sellerID}</td>
                    <td>{product.sellerName}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/${product.images && product.images[0] ? product.images[0] : 'default.jpg'}`}
                        alt={product.productName}
                        width="60"
                        height="60"
                        style={{ borderRadius: '5px' }}
                      />
                    </td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(product, 'products')}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(product.productID, 'products')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Orders Section */}
          <section>
            <h2>Orders</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Buyer ID</th>
                  <th>Product ID</th>
                  <th>Card Number</th>
                  <th>Expiry Date</th>
                  <th>Order Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={`order-${order.orderID || index}`}>
                    <td>{order.orderID}</td>
                    <td>{order.buyerID}</td>
                    <td>{order.productID}</td>
                    <td>{order.cardNumber}</td>
                    <td>{order.expiryDate}</td>
                    <td>{new Date(order.orderDate).toLocaleString()}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(order, 'orders')}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(order.orderID, 'orders')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Edit Modal */}
          {editingItem && (
            <div className="edit-modal">
              <h3>Edit {editType.slice(0, -1)}</h3>
              {Object.keys(editingItem).map(key => (
                <div key={key}>
                  <label>{key}:</label>
                  <input
                    type="text"
                    value={editingItem[key]}
                    onChange={e => setEditingItem({ ...editingItem, [key]: e.target.value })}
                  />
                </div>
              ))}
              <button className="save-btn" onClick={saveEdit}>Save</button>
              <button className="cancel-btn" onClick={() => setEditingItem(null)}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
