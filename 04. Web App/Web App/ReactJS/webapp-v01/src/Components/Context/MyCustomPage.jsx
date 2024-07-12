// src/MyCustomPage.js
import React, { useState, createContext, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';

const NavigationContext = createContext();

const useNavigation = () => useContext(NavigationContext);

const NavigationProvider = ({ children }) => {
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

const ProtectedRoute = ({ element, ...rest }) => {
  const { allowedNavigation } = useNavigation();

  return allowedNavigation ? element : <Navigate to="/my" />;
};

const MyCustomPage = () => {
  const { setAllowedNavigation } = useNavigation();
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    setAllowedNavigation(true);
    navigate(path);
  };

  return (
    <div>
      <h1>My Custom Page</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page1" element={<ProtectedRoute element={<Page1 />} />} />
        <Route path="/page2" element={<ProtectedRoute element={<Page2 />} />} />
      </Routes>
      <button onClick={() => handleButtonClick('/my/page1')}>Navigate to Page 1</button>
      <button onClick={() => handleButtonClick('/my/page2')}>Navigate to Page 2</button>
    </div>
  );
};

const MyCustomPageWrapper = () => {
  return (
    <NavigationProvider>
      <MyCustomPage />
    </NavigationProvider>
  );
};

export default MyCustomPageWrapper;
