// frontend/src/context/UserContext.jsx
import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('Guest');
  const [userID, setUserID] = useState('guest');

  const login = (name, id) => {
    setUserName(name);
    setUserID(id);
    localStorage.setItem('userName', name);
    localStorage.setItem('userID', id);

  };

  const logout = () => {
    setUserName('Guest');
    setUserID('guest');
    localStorage.removeItem('userName');
    localStorage.removeItem('userID');

  };

  return (
    <UserContext.Provider value={{ userName, userID, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
