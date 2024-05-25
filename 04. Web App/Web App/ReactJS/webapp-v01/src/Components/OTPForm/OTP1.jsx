import React, { useEffect, useState } from 'react'
import './OTP1.css'
import OTPInput from 'react-otp-input'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function OTP({user, sendResponse}) {
  // Variable for initial count
  let endTime = 120;

  // Variable for server OTP
  const [serverOTP, setServerOTP] = useState('abc123');

  // Initialize useNavigate hook
  const navigate = useNavigate(); 

  // variable where user entered otp is stored
  const [otp, setOtp] = useState('');

  // variable for disable otp field
  const [isDissable, setIsDissable] = useState(false);

  // variable for disable Resend button
  const [resendDissable, setresendDissable] = useState(true);

  // variable to store reamining time
  const [time, setTime] = useState(endTime);

  // Use effect for get the OTP from server
  /*
  
    implement function here

  */

  // Send the user Log to the server
  /*
    user, finalOTP
    implement function here
  
  */

  // Use effect for the countdown
  useEffect(()=>{
    if(time>0){
      setTimeout(() => {
        setTime(time-1);
      }, 1000);
    }
    else{
      setIsDissable(true);
      setresendDissable(false);
      alert("Time is out! \nPlease click Resend OTP to get a new OTP.");      
    }
  }, [time])

  // Function to handle login button
  const loginHandle = () =>{
    if(serverOTP === otp){
      alert('Successful Login!');
      // Add function to send user log
      navigate('/');
    }
    else{
      alert('Invalid OTP! \nTry Again!');
      setOtp ('');
    }
  }

  // Function to handle back button
  const backHandle = () =>{
    sendResponse('none');
  }

  // Function to handle Resend Option
  const resendHandle = () =>{
    if (resendDissable){
      alert('Wait till countdown ends!')
    }
    else{
      setTime(endTime);
      setIsDissable(false);
      setOtp('');
      setresendDissable(true);
      // function to get the new OTP from the server
      alert('Resend OTP');
    }
  }

  return (
    <div className='OTP-Wrappper'>
      <h3>Enter Your OTP</h3>
      <label>We sent an OTP to your mobile number and the email. It is valid for next {time} seconds.</label>
      
      <div className="otp-area">
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => <input {...props} disabled={isDissable}/>}
          inputStyle={{
            width: '40px',
            height: '40px',
            border: '2px solid #666666',
            borderRadius: '4px',
            margin: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.795)',
            color: 'black',
            fontSize: '20px',
          }}
        />
      </div>

      <div className='btn-container'>
        <Button onClick={backHandle} variant='outline-light'>Back</Button>
        <Button onClick={loginHandle} variant='light'>Login</Button>
      </div>
      
      {/* Edit URL Here */}
      <label>Didn't recive an OTP? <span onClick = {resendHandle} disabled = {resendDissable}><b><u> Resend OTP </u></b></span></label>

    </div>
  )
}
