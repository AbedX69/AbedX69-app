import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import WelcomePage from './pages/WelcomePage';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import CreateProduct from './pages/CreateProduct';
import ItemPage from './pages/ItemPage';
import OrderPage from './pages/OrderPage';
import ProductPage from './pages/ProductPage';
import Footer from './components/Footer';
import FloatingShapes from './components/FloatingShapes'; // Floating shapes behind the content
import { UserProvider } from './context/UserContext.jsx';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Header />
          <FloatingShapes /> {/* Floating shapes stay behind the content */}
          <main className="content">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/sell-product" element={<CreateProduct />} />
              <Route path="/ProductPage" element={<ProductPage />} />
              <Route path="/product/:productID" element={<ItemPage />} />
              <Route path="/order/:productID" element={<OrderPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
