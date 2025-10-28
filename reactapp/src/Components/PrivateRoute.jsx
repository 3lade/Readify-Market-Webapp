import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const PrivateRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = authService.isAuthenticated();
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/error" replace />;
  }

  return children;
};

export default PrivateRoute;