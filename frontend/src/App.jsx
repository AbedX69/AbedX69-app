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
import FloatingShapes from './components/FloatingShapes'; 
import { UserProvider } from './context/UserContext.jsx';
import './App.css';

// Import new pages from the footerstuff folder
import AboutUs from './components/footerstuff/AboutUs';
import ContactUs from './components/footerstuff/ContactUs';
import FAQ from './components/footerstuff/FAQ';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Header />
          <FloatingShapes />
          <main className="content">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/sell-product" element={<CreateProduct />} />
              <Route path="/ProductPage" element={<ProductPage />} />
              <Route path="/product/:productID" element={<ItemPage />} />
              <Route path="/order/:productID" element={<OrderPage />} />

              {/* New Routes for Footer Pages */}
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
