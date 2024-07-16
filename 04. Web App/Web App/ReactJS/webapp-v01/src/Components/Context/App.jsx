// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Context/Home';
import Page1 from './Components/Context/Page1';
import Page2 from './Components/Context/Page2';
import MyCustomPage from './Components/Context/MyCustomPage';

const App = () => {
  const [allowedNavigation, setAllowedNavigation] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route
          path="/my-custom-page/*"
          element={<MyCustomPage allowedNavigation={allowedNavigation} setAllowedNavigation={setAllowedNavigation} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
