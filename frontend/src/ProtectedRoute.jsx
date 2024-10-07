import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from './context/UserContext.jsx';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { userID, isAdmin } = useContext(UserContext);

  if (userID === 'guest') {
    return <Navigate to="/signin" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
