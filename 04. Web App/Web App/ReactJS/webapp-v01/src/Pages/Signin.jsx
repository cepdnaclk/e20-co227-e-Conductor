import React, { useState } from 'react'
import Login from '../Components/LoginForm/login1'
import './Signin.css'
import OTP from '../Components/OTPForm/OTP1'

export default function Signin( { setIsLogged, language, setAllowNavigate } ) {
  // Empty data set
  const emptyData = {
    userID: '',
    mobile: '',
    email: '',
    sessionData: { }
  }  
  
  // Variable for storing current login state.
  const [isLoging, setIsLogin] = useState(false);      // boolean
  const [userData, setUserData] = useState(emptyData); // data Object

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
            <Login data={userData} sendResponse={handleResponse} language={language} setAllowNavigate={setAllowNavigate}/>
          </>
        ):(
          <>
            <OTP setIsLogged={setIsLogged} userData={userData} sendResponse={handleResponse} language={language} setAllowNavigate={setAllowNavigate}/>
          </>
        )
      }
    </div>
  )
}
