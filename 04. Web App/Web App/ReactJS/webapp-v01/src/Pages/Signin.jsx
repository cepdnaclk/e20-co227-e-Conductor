import React, { useState } from 'react'
import Login from '../Components/LoginForm/login1'
import './Signin.css'
import OTP from '../Components/OTPForm/OTP1'

export default function Signin() {
  // Variable for storing current login state.
  const [isLoging, setIsLogin] = useState(false);   // boolean
  const [user, setUser] = useState('');             // User ID or none
  const [mobile, setMobile] = useState('');         // Mobile number 

  const handleResponse = (response) =>{
    //console.log('New Login:');
    //console.log(response);
    if(response === 'none'){
      setIsLogin(false);
      setUser('');
      setMobile(''); 
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
            <Login user={handleResponse} mobile={e=>{setMobile(e)}}/>
          </>
        ):(
          <>
            <OTP userID={user} mobile={mobile} sendResponse={handleResponse}/>
          </>
        )
      }
    </div>
  )
}
