// This is the main code for the web app

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import Bookings from "./Pages/bookings";
import Topups from "./Pages/topups";
import Invoice from "./Pages/Invoice";
import Forbidden from "./Pages/Forbidden";
import General from './Components/Dashboard/General'
import Transactions from './Components/Dashboard/Transactions'
import Tickets from './Components/Dashboard/Tickets'
import Devices from './Components/Dashboard/Devices'
import Settings from './Components/Dashboard/Settings'

function App() {
  /* Top level controlls for the web app */

  // To identify the current language of the webapp
  const localLanguage = localStorage.getItem('language');
  const [language, setLanguage] = useState((localLanguage === 'en' || localLanguage === 'sn') ? localLanguage : 'en');

  useEffect(()=>{
    console.log(`localLanguage: ${localLanguage}     language: ${language}`);
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
            path = "about" 
            element={<About language={language} setLanguage={setLanguage}/>}
          ></Route>

          <Route 
            path = "booking" 
            element={<Bookings language={language} setLanguage={setLanguage}/>}
          ></Route>

          <Route 
            path = "topup" 
            element={<Topups language={language} setLanguage={setLanguage}/>}
          ></Route>

          <Route 
            path = "signin" 
            element={<Signin language={language}/>}
          ></Route>

          <Route 
            path = "signup" 
            element={<Signup language={language}/>}
          ></Route>

          <Route 
            path = "dashboard" 
            element={<Dashboard language={language} setLanguage={setLanguage}/>}
          >
            <Route path = "" element={<Navigate to="general" replace/>} />
            <Route path = "general" element={<General language={language} />} />
            <Route path = "transactions" element={<Transactions language={language} />} />
            <Route path = "tickets" element={<Tickets language={language} />} />
            <Route path = "devices" element={<Devices language={language} />} />
            <Route path = "settings" element={<Settings language={language} />} />
          </Route>

          <Route 
            path = "invoice" 
            element={<Invoice language={language}/>}
          ></Route>

          <Route 
            path = "*" 
            element={<Forbidden/>}
          ></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
