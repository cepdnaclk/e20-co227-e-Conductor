// This is the main code for the web app

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from './Components/Navbars/Navbar2';
import Footer from "./Components/Footer/Footer2";
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
import Settings from "./Components/Dashboard/Settings";
import VerifyEmail from "./Pages/VerifyEmail";
import Terms from "./Pages/TermsConditions";
import { Post, Request } from "./APIs/NodeBackend";
import { getSessionData } from "./Components/SessionData/Sessions";
import { PrivertRouteToSignin, PrivertRouteToHome } from "./Routes/PrivertRoutes";

function App() {
  /* Top level controlls for the web app */

  // To identify the current language of the webapp
  const localLanguage = localStorage.getItem('language');
  const [language, setLanguage] = useState((localLanguage === 'en' || localLanguage === 'sn') ? localLanguage : 'en');
  
  // To identify the login status
  const login = sessionStorage.getItem('isLogged');
  const [isLogged, setIsLogged] = useState(login !== null ? login : 'none');
  const [sessionData, setSessionData] = useState({});

  /*// To identify the navigation status
  const [allowNavigate, setAllowNavigate] = useState( sessionStorage.getItem('allowNavigate') !== null ? sessionStorage.getItem('allowNavigate') : false );
  */
  
  // Fetching session data
  useEffect(() => {
    const fetchData = async () => {
      const sessionData = await getSessionData();
      console.log(`SessionData:: ${JSON.stringify(sessionData)}`);
      setSessionData(sessionData);
    };
    if(isLogged === 'true'){
      //console.log(sessionStorage.getItem('sessionData'));
      setSessionData(JSON.parse(sessionStorage.getItem('sessionData')));
    }
    else{
      fetchData();
    }
  }, []);

  // Finding session status
  useEffect(()=>{
    const userID = JSON.parse(localStorage.getItem('userId'));
    console.log(`UID: ${userID}  sessionDataIsNull: ${Object.keys(sessionData).length === 0}`);      

    // If session data is not empty
    if(isLogged!=='true' && Object.keys(sessionData).length > 0){
      console.log("session validating!");
      sessionStorage.setItem('sessionData', JSON.stringify(sessionData));

      if (userID !== null){
        sessionStatus(userID);
      }
      else {
        setIsLogged('false');
      }
    }
  },[sessionData])

  useEffect(()=>{
    console.log(`isLogged: ${isLogged}  typeof(isLogged):: ${typeof(isLogged)}`);
    if(isLogged === 'true'){
      sessionStorage.setItem('isLogged', 'true');
    }
    else if(isLogged !== 'none'){
      const userID = JSON.parse(localStorage.getItem('userId'));

      if(userID !== null){
        sessionTerminate(userID);
      }
      console.log(`removed user : ${userID}`);
      localStorage.clear();
      sessionStorage.clear();
    }
  }, [isLogged])

  // Function to get session status
  const sessionStatus = async (value) =>{
    // Creating data object
    const data = {
      type: 'Log1',  // Requesting session status from our backend
      data: {
        userID: value,
        session: sessionData,
      }
    }
    //console.log(`request message::   type: ${data.type}      data: ${JSON.stringify(data.data)}`);

    try {
        const serverResponse = await Request(data, 'logs/users');
        console.log(`Session Status:: ${serverResponse.data}`);
        setIsLogged(serverResponse.data==='active' ? 'true' : 'false');
    } catch (error) {
        console.error(`Error finding session status: ${error} \n Refresh your browser.`);
    }
  }

  // Function to terminate session
  const sessionTerminate = async (value) =>{
    // Creating data object
    const data = {
      type: 'Log2',  // Terminate session from our backend
      data: {
        userID: value,
        MAC: sessionData.MAC,
        browser: sessionData.browser,
      }
    }
    console.log(`post message::   type: ${data.type}      data: ${JSON.stringify(data.data)}`);

    try {
        await Post(data, 'logs/users');
        //console.log(`Session Status:: ${serverResponse.data}`);
    } catch (error) {
        console.error(`Error in terminating session: ${error} \n Refresh your browser.`);
    }
  }
  
  // function to get device language
  useEffect(()=>{
    localStorage.setItem('language', language);
    //console.log(`localLanguage: ${localLanguage}     language: ${language}`);
  },[language])

  /*// Check Naigation status
  useEffect(()=>{
    console.log(`NavAllow: ${allowNavigate}`);
  },[allowNavigate])
  */

  return (
    <div>
      <BrowserRouter>
        <Navbar isLogged={isLogged} setIsLogged={setIsLogged} language={language} setLanguage={setLanguage} />
        
        <Routes>
          <Route path = "/" element={<Navigate to="home"/>} />
          <Route path = "home" element={<Home language={language}/>} />
          
          <Route path = "about" element={<About language={language} />} />
          
          <Route element={<PrivertRouteToSignin isLogged={isLogged}/>}>
            <Route path = "booking" element={<Bookings language={language}/>} />
            <Route path = "topup" element={<Topups language={language}/>} />
            <Route path = "dashboard" element={<Dashboard setIsLogged={setIsLogged} language={language} />} >
              <Route path = "" element={<Navigate to="general" replace/>} />
              <Route path = "general" element={<General language={language} />}/>
              <Route path = "transactions" element={<Transactions language={language} />} />
              <Route path = "tickets" element={<Tickets language={language} />} />
              <Route path = "devices" element={<Devices language={language} setIsLogged={setIsLogged} />} />
              <Route path = "settings" element={<Settings language={language} />} />
            </Route>
            <Route path = "invoice" element={<Invoice language={language} />} />
          </Route>

          <Route element={<PrivertRouteToHome isLogged={isLogged}/>} >
            <Route path = "signin" element={<Signin setIsLogged={setIsLogged} language={language} />} />
            <Route path = "signup" element={<Signup language={language} />} />
            <Route path = "verify" element={<VerifyEmail language={language} />} />
          </Route>

          <Route path = "terms" element={<Terms language={language}/>} />
   
          <Route path = "*" element={<Forbidden language={language} />} />
        </Routes>
        
        <Footer/>
      </BrowserRouter>      
    </div>
  );
}

export default App;
