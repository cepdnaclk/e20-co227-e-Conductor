import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, isLogged, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isLogged ? <Component /> : <Navigate to="/signin" />}
    />
  );
};

export default PrivateRoute;
