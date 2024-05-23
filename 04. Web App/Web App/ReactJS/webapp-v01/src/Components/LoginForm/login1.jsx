import { Button, Container } from 'react-bootstrap';
import { FaApple, FaEnvelope, } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './login1.css'
import { GoPasskeyFill } from 'react-icons/go';


function Login() {

  const [number, setNumber] = useState('');

  const submit = () => {
    alert('Mobile number: ' + number);
    // console.log('Mobile number: ' + number);
  };
  

  return (
    <div className='wrapper'>

        <form action=''>
            <h1><b>Login</b></h1>

            <label>Enter your mobile number</label><br/>

            <Container className='input-box'>
              <PhoneInput 
                country={'lk'}
                value={number}
                onlyCountries={['lk']}
                countryCodeEditable={false}
                onChange={setNumber}
                inputProps={{
                  maxLength: 15, // Country code (3) + 9 digits + 3 spaces
                }}
              />
              <GoPasskeyFill className='user-with-key'/>
            </Container>

            <label className='RememberMe'><input type='checkbox'/> Rermember me</label>

            <Button 
                variant="light" 
                className='custombutton'
                type='sumbit'
                onClick={submit}
                ><b>Continue</b>
            </Button>

            <Container className='button-holder'>
                <div className='text-between-lines'>
                    <hr/><span>or</span><hr/>
                </div>
                <Button variant="light" className='custombutton2'><FcGoogle className='icon'/><span className='Button-text'>Continue with Google</span></Button>
                <Button variant="light" className='custombutton2'><FaApple className='icon'/><span className='Button-text'>Continue with Apple</span></Button>
                <Button variant="light" className='custombutton2'><FaEnvelope className='icon'/><span className='Button-text'>Continue with Email</span></Button>
            </Container>

            <div className='register'>
                <p>Don't have an account? <a href='/en-signup'>Register</a> </p></div>
            
        </form>
    </div>
  );
}

export default Login;