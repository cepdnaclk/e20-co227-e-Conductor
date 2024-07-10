// src/MyCustomPage.js
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home';
import Page1 from '../../Pages/About';
import Page2 from '../../Pages/Signin';

const ProtectedRoute = ({ allowedNavigation, element }) => {
  return allowedNavigation ? element : <Navigate to="/my" />;
};

const MyCustomPage = ({ allowedNavigation, setAllowedNavigation }) => {
  useEffect(()=>{
    console.log(`allow Nav:: ${allowedNavigation}`);
  }, [allowedNavigation])
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
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>

      <div><Navigate to={'/my/page1'}><h1>Page1</h1></Navigate></div>
      <button onClick={() => handleButtonClick('/my/page1')}>Navigate to Page 1</button>
      <button onClick={() => handleButtonClick('/my/page2')}>Navigate to Page 2</button>
    </div>
  );
};

export default MyCustomPage;
