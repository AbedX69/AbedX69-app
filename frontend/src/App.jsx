import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import WelcomePage from './pages/WelcomePage';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import CreateProduct from './pages/CreateProduct';
import ProductPage from './pages/ProductPage'; // Import ProductPage
import { UserProvider } from './context/UserContext.jsx';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="content">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/sell-product" element={<CreateProduct />} />
              <Route path="/ProductPage" element={<ProductPage />} /> {/* Fix for ProductPage route */}
            </Routes>
          </main>
          <footer className="footer">
            <p>&copy; 2024 AbedX69. All rights reserved.</p> {/* Updated with the correct application name */}
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> | <a href="#">Contact Us</a>
          </footer>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
