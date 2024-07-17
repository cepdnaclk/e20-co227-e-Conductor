import React, { useEffect, useState } from 'react'
import './OTP1.css'
import OTPInput from 'react-otp-input'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { handleNotifications } from '../MyNotifications/FloatingNotifications'
import { Request, Post } from '../../APIs/NodeBackend';

export default function OTP({formData, sendResponse}) {
  // Variable for initial count
  let endTime = 120;

  // Initialize useNavigate hook
  const navigate = useNavigate(); 
  
  // Variable for server OTP
  const [auth, setAuth] = useState(null);

  // variable where user entered otp is stored
  const [otp, setOtp] = useState('');

  // variable for disable otp field
  const [isDissable, setIsDissable] = useState(false);

  // variable for disable Resend button
  const [resendDissable, setresendDissable] = useState(true);

  // variable to store reamining time
  const [time, setTime] = useState(endTime);

  // Function to handle login button
  const loginHandle = () =>{
    requestLoginAccess({mobile:formData.mobile, email:formData.email, value:otp, origin:'signup'});
  }

  // Function to handle back button
  const backHandle = () =>{
    //console.log('Role: ' + formData.role);
    sendResponse(formData.userType);
  }

  // Function to handle Resend Option
  const resendHandle = () =>{
    if (resendDissable){
      handleNotifications({
        type:'warning', 
        title:'Wait!', 
        body:'Wait untill countdown ends!'
      });
      //console.log('Wait untill countdown ends!');   // Screen notification
    } 
    else{
      setTime(endTime);
      setIsDissable(false);
      //requestOTP(formData.mobile);
      requestOTP({mobile:formData.mobile, email:formData.email});
      setOtp('');
      setresendDissable(true);
      // function to get the new OTP from the server
      handleNotifications({
        type:'info', 
        title:'Resend OTP!', 
        body:'New OTP is sent to your mobile number.'
      });
      //console.log('Resend OTP');                    // Screen notification
    }
  }

  // Function to get the OTP from server
  const requestOTP = async (value) => {
    // Creating data object
    const data = {
    type: 'signupOTP',  // OTP request
    data: value
    }
    //console.log(`request message::   type: ${data.type}      data: ${data.data}`);

    try {
        await Post(data, 'OTP');
    } catch (error) {
        console.error('Error adding user:', error);
    }
  };

  // Function to get logging access
  const requestLoginAccess = async (values) => {
    // Creating data object
    const data = {
      type: 'verify',
      data: values
    }
    //console.log(`request message::   type: ${data.type}      userOTP: ${JSON.stringify(data.data)}`);

    try {
        const serverRespose = await Request(data, 'OTP');
        //console.log(`Authentication: ${serverRespose.data}`);
        setAuth(JSON.stringify(serverRespose.data));
    } catch (error) {
        console.error('Error adding user:', error);
    }
  };

  // Function to send new user details to the database
  const sendData = async (value) => {
    // Creating data object
    const data = {
    type: 'Req3',  // Posting new user login details
    data: value
    }
    //console.log(`request message::   type: ${data.type}      data: ${data.data.licenceFile[0]}`);

    try {
        await Post(data, 'users');
        console.log(`Registered Successfully`);
    } catch (error) {
        console.error('Error adding user:', error);
    }
  };

  // Trigering at the start
  useEffect(()=>{
    //console.log(`New user OTP SEND:: mobile: ${formData.mobile}`);
    //requestOTP(formData.mobile);
    requestOTP({mobile:formData.mobile, email:formData.email});
  }, []);  

  // Use effect for the authentication
  useEffect(()=>{
    if(auth === 'true'){
      navigate('/verify');
      //setAllowNavigate(true);
      handleNotifications({
        type:'success', 
        title:'Registration Successful!', 
        body:'Welcome to e-Conductor Family.\nUse the sent link to your email for initial login.'
      });
      sendData(formData);      
    }
    else if(auth === 'false'){
      handleNotifications({
        type:'error', 
        title:'Invalid OTP!', 
        body:'OTP is invalid. Try Again!'
      });
      setOtp ('');
    }
    else if (auth !== null) {
      handleNotifications({
        type:'warning', 
        title:'Network Issue!', 
        body:'Try Again!'
      });
      setOtp ('');
    }
  }, [auth]);

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
      handleNotifications({
        type:'warning', 
        title:'Time is out!', 
        body:'Please click Resend OTP to get a new OTP.'
      });
      //console.log('Time is out');                  // Screen notification
    }
  }, [time])

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