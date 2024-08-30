import React from 'react';
import WelcomePage from './pages/WelcomePage.jsx';
import './App.css';  // Create this file for global styles

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>My Application</h1>
        {/* Add your navigation links here if needed */}
      </header>

      <main className="content">
        <WelcomePage />
        {/* Other routes or pages can be added here */}
      </main>

      <footer className="footer">
        <p>&copy; 2024 My Application. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
