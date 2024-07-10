// This is the main code for the web app

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import Bookings from "./Pages/Bookings";
import Topups from "./Pages/topups";
import Invoice from "./Pages/Invoice";
import Forbidden from "./Pages/Forbidden";
import General from './Components/Dashboard/General'
import Transactions from './Components/Dashboard/Transactions'
import Tickets from './Components/Dashboard/Tickets'
import Devices from './Components/Dashboard/Devices'
import Settings from './Components/Dashboard/Settings'
import VerifyEmail from "./Pages/VerifyEmail";
import Terms from "./Pages/TermsConditions";
import { Post, Request } from "./APIs/NodeBackend";
import { getDeviceData } from "./Components/SessionData/Sessions";

function Appp(isLogged, setIsLogged, language, setLanguage) {


  return (
    <div>
      
        <Routes>

          {/*<Route path="/my-custom-page/*" element={<MyCustomPage allowedNavigation={allowedNavigation} setAllowedNavigation={setAllowedNavigation} />} />*/}
          
          <Route 
            path = "/"
            element={<Home isLogged={isLogged} setIsLogged={setIsLogged} language={language} setLanguage={setLanguage}/>}
          ></Route>

          <Route 
            path = "/about" 
            element={<Home isLogged={isLogged} setIsLogged={setIsLogged} language={language} setLanguage={setLanguage}/>}
          ></Route>

          <Route 
            path = "/booking" 
            element={<Bookings isLogged={isLogged} setIsLogged={setIsLogged} language={language} setLanguage={setLanguage}/>}
          ></Route>

          <Route 
            path = "topup" 
            element={<Topups isLogged={isLogged} setIsLogged={setIsLogged} language={language} setLanguage={setLanguage}/>}
          ></Route>

          <Route 
            path = "signin" 
            element={<Signin setIsLogged={setIsLogged} language={language}/>}
          ></Route>

          <Route 
            path = "signup" 
            element={<Signup isLogged={isLogged} language={language}/>}
          ></Route>

          <Route 
            path = "dashboard" 
            element={<Dashboard isLogged={isLogged} setIsLogged={setIsLogged} language={language} setLanguage={setLanguage}/>}
          >
            <Route path = "" element={<Navigate to="general" replace/>} />
            <Route path = "general" element={<General language={language} />} />
            <Route path = "transactions" element={<Transactions language={language} />} />
            <Route path = "tickets" element={<Tickets language={language} />} />
            <Route path = "devices" element={<Devices language={language} setIsLogged={setIsLogged}/>} />
            <Route path = "settings" element={<Settings language={language} />} />
          </Route>

          <Route 
            path = "invoice" 
            element={<Invoice isLogged={isLogged} language={language}/>}
          ></Route>

          <Route 
            path = "verify" 
            element={<VerifyEmail isLogged={isLogged} setIsLogged={setIsLogged} language={language} setLanguage={setLanguage}/>}
          ></Route>

          <Route 
            path = "terms" 
            element={<Terms isLogged={isLogged} setIsLogged={setIsLogged} language={language} setLanguage={setLanguage}/>}
          ></Route>

          <Route 
            path = "*" 
            element={<Forbidden isLogged={isLogged} setIsLogged={setIsLogged} language={language} setLanguage={setLanguage}/>}
          ></Route>

        </Routes>
      
    </div>
  );
}

export default Appp;
