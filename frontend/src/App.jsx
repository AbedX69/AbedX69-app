// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import WelcomePage from './pages/WelcomePage';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import CreateProduct from './pages/CreateProduct'; // Import the CreateProduct page
import { UserProvider } from './context/UserContext.jsx'; // Import UserProvider
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
              <Route path="/sell-product" element={<CreateProduct />} /> {/* Add the route for creating a product */}
            </Routes>
          </main>
          <footer className="footer">
            <p>&copy; 2024 My Application. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
