import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { GoPasskeyFill } from 'react-icons/go';
import { FaApple, FaEnvelope } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { handleNotifications } from '../MyNotifications/FloatingNotifications';
import { Request } from '../../APIs/Connections';
import './login1.css';


function Login({ user, mobile, language }) {  // language is not implemented yet
  // variable for mobile number
  const [number, setNumber] = useState('');

  // variable for user id
  const [userId, setUserId] = useState('');


  // Effect to handle user validation after userId state changes
  useEffect(() => {
    if (userId !== '') {
      //console.log(`UserID: ${userId}  mobile: ${number}`);
      user(userId);   // Send userId to the parent component
      mobile(number); // Send mobile number to the parent component
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
  }, [userId]);


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
      requestUser(number);
    }
  };

  // Use effect for get the OTP from server
  const requestUser = async (value) => {
    // Creating data object
    const data = {
      type: 'Req2', // Uservalidation message
      data: value
    }
    //console.log(`request message::   type: ${data.type}      data: ${data.data}`);

    try {
        const serverUserId = await Request(data, 'users');
        //console.log(`ServerUserId:: ${serverUserId.id}`);
        setUserId(serverUserId.id);  // Change here according to the database name
    } catch (error) {
        console.error('Error adding user:', error);
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
          <p>Don't have an account? <a href={`/signup`}>Register</a> </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
