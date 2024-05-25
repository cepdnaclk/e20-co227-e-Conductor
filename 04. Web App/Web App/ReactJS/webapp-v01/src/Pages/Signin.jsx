import React, { useState } from 'react'
import Login from '../Components/LoginForm/login1'
import './Signin.css'
import OTP from '../Components/OTPForm/OTP1'

export default function Signin() {
  // Variable for storing current login state.
  const [isLoging, setIsLogin] = useState(false);
  const [user, setUser] = useState('');

  const handleResponse = (response) =>{
    if(response === 'none'){
      setIsLogin(false);
      setUser('');
    }
    else{
      setUser(response);
      setIsLogin(true);
    }
  }

  return (
    <div className='Login-body'>
      {
        !isLoging ? (
          <>
            <Login sendResponse={handleResponse}/>
          </>
        ):(
          <>
            <OTP userID = {user} sendResponse = {handleResponse}/>
          </>
        )
      }
    </div>
  )
}
