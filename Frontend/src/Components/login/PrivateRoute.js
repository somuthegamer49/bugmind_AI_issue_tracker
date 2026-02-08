// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const login = useSelector((state) => state.login); 

  return login ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
