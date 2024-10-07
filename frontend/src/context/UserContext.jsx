import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('Guest');
  const [userID, setUserID] = useState('guest');
  const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin state

  // Load user data from localStorage on initial load
  useEffect(() => {
    const savedUserName = localStorage.getItem('userName');
    const savedUserID = localStorage.getItem('userID');
    const savedIsAdmin = localStorage.getItem('isAdmin') === 'true'; // Retrieve isAdmin status from localStorage

    if (savedUserName && savedUserID) {
      setUserName(savedUserName);
      setUserID(savedUserID);
      setIsAdmin(savedIsAdmin);
    }
  }, []);

  const login = (name, id, admin = false) => {
    setUserName(name);
    setUserID(id);
    setIsAdmin(admin); // Set isAdmin value
    localStorage.setItem('userName', name);
    localStorage.setItem('userID', id);
    localStorage.setItem('isAdmin', admin.toString()); // Save isAdmin to localStorage
  };

  const logout = () => {
    setUserName('Guest');
    setUserID('guest');
    setIsAdmin(false); // Reset isAdmin state
    localStorage.removeItem('userName');
    localStorage.removeItem('userID');
    localStorage.removeItem('isAdmin'); // Remove isAdmin from localStorage
  };

  return (
    <UserContext.Provider value={{ userName, userID, isAdmin, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
