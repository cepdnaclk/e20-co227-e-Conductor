// This is the main code for the web app

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import Bookings from "./Pages/Bookings";
import Topups from "./Pages/Topups";
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
import MyCustomPage from "./Components/Context/MyCustomPage"

function Appp(isLogged, setIsLogged, language, setLanguage) {

  const [allowedNavigation, setAllowedNavigation] = useState(false);


  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/my/*" element={<MyCustomPage allowedNavigation={allowedNavigation} setAllowedNavigation={setAllowedNavigation} />} />
                 </Routes>
        </BrowserRouter>
    </div>
  );
}

export default Appp;
