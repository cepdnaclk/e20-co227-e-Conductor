import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useNavigation } from './NavigationContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { allowedNavigation } = useNavigation();

  return (
    <Route
      {...rest}
      render={(props) =>
        allowedNavigation ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  ); 
};

export default ProtectedRoute;
