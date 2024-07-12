import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { GoPasskeyFill } from 'react-icons/go';
import { FaApple, FaEnvelope } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { handleNotifications } from '../MyNotifications/FloatingNotifications';
import { Request } from '../../APIs/NodeBackend';
import { getSessionData } from '../SessionData/Sessions';
import './login1.css';

function Login({ data, sendResponse, language, setAllowNavigate }) {  // language is not implemented yet
  // possible responses
  const userTypes = ['passenger', 'employee', 'owner'];
  const empTypes  = ['None', 'Driver', 'Conductor', 'Both'];
  const emailPattren = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  // variable for mobile number
  const [number, setNumber] = useState('');

  // variable for userData
  const [userData, setUserData] = useState(data);

  // Effect to handle session data
  useEffect(() => {
    const fetchData = async () => {
      const sessionData = await getSessionData();
      setUserData({ ...userData, sessionData: sessionData });
    };
  
    fetchData();
  }, []);
   
  // Effect to handle user validation after userId state changes
  useEffect(() => {
    //console.log(`ServerUserId useEffect:: ${userData.userID}    ServerUserEmail:: ${userData.email}`);
    if(userData.userID === 'invalid' && userData.email === 'invalid' && userData.userType === 'invalid' && userData.empType === 'invalid') {
      handleNotifications({
        type:'error', 
        title:'Invalid mobile number!', 
        body:'Please try again!'
      });
      //console.log('Invalid mobile number!\nTry again!');
      setNumber('+94');
      setUserData({...userData, userID: '', email: '', userType: '', empType: ''});
    }
    else if ((Number.isInteger(userData.userID)) && (emailPattren.test(userData.email)) && (userTypes.includes(userData.userType)) && (empTypes.includes(userData.empType))) {
      //console.log(`user data:: ${JSON.stringify(userData)}`);
      sendResponse(userData); // Send data to parent component
    }
    else if (userData.email !== '' || userData.userID !== '' || userData.userType !== '' || userData.empType !== ''){
      handleNotifications({
        type: 'warning',
        title: 'Network Error!',
        body: 'Network connection is unstable. Please reload page again.'
      })
      setNumber('+94');
      setUserData({...userData, userID: '', email: '', userType: '', empType: ''});
    }   
  }, [userData.userID, userData.email, userData.empType, userData.userType]);

  // Handling submit 
  const submit = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (number.length < 11) {
      handleNotifications({
        type:'error', 
        title:'Invald mobile number!', 
        body:'Please try again!'
      });
      //console.log("Invald mobile number!\nTry again!");
      setNumber('+94');
    } 
    else {
      requestUserDetails(number);
    }
  };

  // Use effect for get the user id and email from our server
  const requestUserDetails = async (value) => {
    // Creating data object
    const data = {
      type: 'Req2', // User validation message
      data: value   // Mobile number of the user
    }
    //console.log(`request message::   type: ${data.type}      data: ${data.data}`);
  
    try {
        const serverResponse = await Request(data, 'users');
        const {userID, email, userType, empType} = serverResponse.data;
        //console.log(`ServerUserId:: ${userID}    ServerUserEmail:: ${email}     serverUserType: ${userType}    serverEmpType: ${empType}`);
        setUserData({...userData, userID:userID, mobile:number, email:email, userType:userType, empType: empType});
        
    } catch (error) {
        console.error('Error adding user:', error);
    }      
      // setUserId('p1234');
  };

  return (
    <div className='wrapper'>
      <form onSubmit={submit}>
        <h1><b>Login</b></h1>
        <label>Enter your mobile number</label><br />
        <Container className='input-box'>
          <PhoneInput
            country={'lk'}
            value={number}
            onlyCountries={['lk']}
            countryCodeEditable={false}
            onChange={setNumber}
            inputProps={{
              maxLength: 15 // Country code (3) + 9 digits + 3 spaces
            }}
          />
          <GoPasskeyFill className='user-with-key' />
        </Container>
        <label className='RememberMe'><input type='checkbox' /> Remember me</label>
        <Button
          variant="light"
          className='custombutton'
          type='submit'
        ><b>Continue</b>
        </Button>
        <Container className='button-holder'>
          <div className='text-between-lines'>
            <hr /><span>or</span><hr />
          </div>
          <Button variant="light" className='custombutton2'><FcGoogle className='icon' /><span className='Button-text'>Continue with Google</span></Button>
          <Button variant="light" className='custombutton2'><FaApple className='icon' /><span className='Button-text'>Continue with Apple</span></Button>
          <Button variant="light" className='custombutton2'><FaEnvelope className='icon' /><span className='Button-text'>Continue with Email</span></Button>
        </Container>
        <div className='register'>
          <p>Don't have an account? <a href={`/signup`} onClick={()=>{setAllowNavigate(true)}}>Register</a> </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
