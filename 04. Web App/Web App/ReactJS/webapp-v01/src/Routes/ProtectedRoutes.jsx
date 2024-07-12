import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowNavigate, ...rest }) => {
  return (
    <Route
      {...rest}
      element={allowNavigate ? <Component /> : <Navigate to="/forbidden" />}
    />
  );
};

export default ProtectedRoute;
