// This is the main code for the web app

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import { useEffect, useState } from "react";
import Settings from "./Pages/Settings";
import Bookings from "./Pages/bookings";
import Topups from "./Pages/topups";

function App() {
  /* Top level controlls for the web app */

  // To identify the current language of the webapp
  const localLanguage = localStorage.getItem('language');
  const [language, setLanguage] = useState((localLanguage === 'en' || localLanguage === 'sn') ? localLanguage : 'en');

  /*
  // To identify the user mode (a visitor or a registerd user)
  const localId = localStorage.getItem('userId');
  const [id, setId] = useState((localId !== '') ? localId : '');
  */
  useEffect(()=>{
    console.log(`localLanguage: ${localLanguage}     language: ${language}`);
    //localStorage.setItem('language', language);
    //console.log(`2. localLanguage: ${localLanguage}     language: ${language}`);
  },[language, localLanguage])
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route 
            path = "/"
            element={<Home language={language} setLanguage={setLanguage}/>}
          ></Route>

          <Route 
            path = "/about" 
            element={<About language={language} setLanguage={setLanguage}/>}
          ></Route>

          <Route 
            path = "/booking" 
            element={<Bookings language={language} setLanguage={setLanguage}/>}
          ></Route>

          <Route 
            path = "/topup" 
            element={<Topups language={language} setLanguage={setLanguage}/>}
          ></Route>

          <Route 
            path = "/signin" 
            element={<Signin language={language}/>}
          ></Route>

          <Route 
            path = "/signup" 
            element={<Signup language={language}/>}
          ></Route>

          <Route 
            path = "/dashboard" 
            element={<Dashboard language={language} setLanguage={setLanguage}/>}
          ></Route>

          <Route 
            path = "/settings" 
            element={<Settings language={language} setLanguage={setLanguage}/>}
          ></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
