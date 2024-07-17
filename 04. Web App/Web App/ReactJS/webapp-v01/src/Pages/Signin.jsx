import React, { useState } from 'react'
import Login from '../Components/LoginForm/login1'
import './Signin.css'
import OTP from '../Components/OTPForm/OTP1'
import { MyBars } from '../Components/Spinners/Spinners'

export default function Signin( { setIsLogged, language } ) {
  // Empty data set
  const emptyData = {
    userID: '',
    userType: '',
    empType: '',
    mobile: '',
    email: '',
    sessionData: { }
  }  
  
  // Variable for storing current login state.
  const [isLoging, setIsLogin] = useState(false);      // boolean
  const [userData, setUserData] = useState(emptyData); // data Object
  const [rememberMe, setRememberMe] = useState(emptyData); // boolean
  const [loading, setLoading] = useState(false);       // boolean

  // Handling response
  const handleResponse = (response) =>{
    //console.log('New Login:');
    //console.log(`Response:: ${JSON.stringify(response)}`);

    if(response === 'none'){
      setIsLogin(false);
      setUserData(emptyData);
    }
    else{
      setUserData(response);
      setIsLogin(true);
    }
  }

  return (
    <div className='Login-body'>
      {
        !isLoging ? (
          <>
            <Login setIsLogged={setIsLogged} data={userData} sendResponse={handleResponse} language={language} rememberMe={setRememberMe} setLoading={setLoading}/>
          </>
        ):(
          <>
            <OTP setIsLogged={setIsLogged} userData={userData} sendResponse={handleResponse} language={language} rememberMe={rememberMe} setLoading={setLoading}/>
          </>
        )
      }
      { loading ? (<MyBars/>) : (<></>)}
    </div>
  )
}
