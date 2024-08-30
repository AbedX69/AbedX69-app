import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage.jsx';
import Signup from './pages/Signup';
import './App.css';  // Global styles

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>My Application</h1>
          <nav>
            <a href="/">Home</a> | <a href="/signup">Sign Up</a>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2024 My Application. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
