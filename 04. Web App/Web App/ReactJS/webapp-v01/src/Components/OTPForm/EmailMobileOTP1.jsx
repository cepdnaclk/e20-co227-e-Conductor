import React, { useEffect, useState } from 'react'
import './OTP1.css'
import OTPInput from 'react-otp-input'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { andleNotifications, handleNotifications } from '../MyNotifications/FloatingNotifications'
import Swal from 'sweetalert2'


export default function OTP({formData, sendResponse}) {
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
      handleNotifications('timeOut');
      console.log('Time is out');                  // Screen notification
    }
  }, [time])

  // Function to handle login button
  const loginHandle = () =>{
    if(serverOTP === otp){
      navigate('/');
      handleNotifications('success');
      console.log('Successful Login!');            // Screen notification
      // Add function to send user log
      
    }
    else{
      handleNotifications('invalid');
      console.log('Invalid OTP! \nTry Again!');    // Screen notification
      setOtp ('');
    }
  }

  // Function to handle back button
  const backHandle = () =>{
    //console.log('Role: ' + formData.role);
    sendResponse(formData.role);
  }

  // Function to handle Resend Option
  const resendHandle = () =>{
    if (resendDissable){
      //handleShowNotification('Wait!', 'Wait untill countdown ends!', 'warning');
      handleNotifications('wait');
      console.log('Wait untill countdown ends!');   // Screen notification
    } 
    else{
      setTime(endTime);
      setIsDissable(false);
      setOtp('');
      setresendDissable(true);
      // function to get the new OTP from the server
      //handleShowNotification('Resend OTP!', 'New OTP is sent to your mobile number.', 'info');
      handleNotifications('resend');
      console.log('Resend OTP');                    // Screen notification
    }
  }

  return (
    <div className='OTP-Wrappper'>

      <h3>Enter Your OTP</h3>
      <label>We sent an OTP to your mobile number. <br/> It is valid for next {time} seconds.</label>
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
