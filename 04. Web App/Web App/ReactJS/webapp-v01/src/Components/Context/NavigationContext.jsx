import React, { createContext, useState, useContext } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [allowedNavigation, setAllowedNavigation] = useState(false);

  const value = {
    allowedNavigation,
    setAllowedNavigation,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
