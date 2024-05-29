import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { GoPasskeyFill } from 'react-icons/go';
import { FaApple, FaEnvelope } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import './login1.css';
import { handleNotifications } from '../MyNotifications/FloatingNotifications'

function Login({ sendResponse }) {
  // variable for mobile number
  const [number, setNumber] = useState('');

  // variable for user id
  const [userId, setUserId] = useState('');


  // Effect to handle user validation after userId state changes
  useEffect(() => {
    if (userId !== '') {
      //console.log('Hello ' + userId);
      sendResponse(userId); // Send userId to the parent component
    }
    else if(userId === 'invalid') {
      handleNotifications({
        type:'error', 
        title:'Invalid mobile number!', 
        body:'Please try again!'
      });
      //console.log('Invalid mobile number!\nTry again!');
      setNumber('+94');
    }
  }, [userId, sendResponse]);


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
      /* 
        In here this program contact with the server and do the user validation.
        Server input: 10 digit mobile number
        Server response: 'invalid' or 'userID'
       */
      //console.log('Mobile Number: ' + number);
      setUserId('p123'); // Set userId to the value of keyID
    }
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
          <p>Don't have an account? <a href='/en-signup'>Register</a> </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
