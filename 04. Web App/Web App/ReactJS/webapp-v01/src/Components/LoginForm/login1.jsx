import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { GoPasskeyFill } from 'react-icons/go';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { handleNotifications } from '../MyNotifications/FloatingNotifications';
import { Request } from '../../APIs/NodeBackend';
import { getSessionData } from '../SessionData/Sessions';
import './login1.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';

function Login({ data, sendResponse, language, setIsLogged, rememberMe, setLoading }) {  // language is not implemented yet
  const navigate = useNavigate();

  // possible responses
  const userTypes = ['passenger', 'employee', 'owner'];
  const empTypes  = ['None', 'Driver', 'Conductor', 'Both'];
  const emailPattren = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  // variable for mobile number
  const [number, setNumber] = useState('');

  // variable for userData
  const [userData, setUserData] = useState(data);

  // variable for rememberMe
  const [remember, setRemember] = useState(false);

  // Effect to handle session data
  useEffect(() => {
    const fetchData = async () => {
      /* try {
        setLoading(true); // show spinner
        const sessionData = await getSessionData();
        //console.log(`SessionData:: ${JSON.stringify(sessionData)}`);
        setUserData({ ...userData, sessionData: sessionData });        
      } catch (error) {
        console.log(`Error in sessionData fetching`);
      } finally {
        setLoading(false);
      } */
      const sessionData = await getSessionData();
      //console.log(`SessionData:: ${JSON.stringify(sessionData)}`);
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
      rememberMe(remember);
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

  // Handling quick auths
  const handleClick = (e) => {
    const button = e.currentTarget.name;
    //console.log(`${button} is clicked.`);
    
    const requestAccess = async (value) => {
      // Creating data object
      const data = {
        type: value, // Authentication method
        data: userData.sessionData    // session data
      }
      //console.log(`request message::   type: ${data.type}      data: ${JSON.stringify(data.data)}`);
    
      try {
          setLoading(true);
          const serverResponse = await Request(data, 'other');
          const {status, userID, userType, empType} = serverResponse.data;
          //console.log(`ServerResponse:: Login is: ${status}  UserId:: ${userID}  ServerUserEmail:: ${email}  serverUserType: ${userType}  serverEmpType: ${empType}`);
          setLoading(false);
          if (status === 'success') {
            console.log('login is successful!');

            if(remember){
              localStorage.setItem('userId', JSON.stringify(userID));
              localStorage.setItem('language', language);
              localStorage.setItem('userType', JSON.stringify(userType));
              localStorage.setItem('empType', JSON.stringify(empType));
            }
            else{
              sessionStorage.setItem('userId', JSON.stringify(userID));
              sessionStorage.setItem('language', language);
              sessionStorage.setItem('userType', JSON.stringify(userType));
              sessionStorage.setItem('empType', JSON.stringify(empType));
            }
            sessionStorage.setItem('isLogged', 'true');
            sessionStorage.setItem('sessionData', JSON.stringify(userData.sessionData));
            setIsLogged('true');
            navigate('/');
            handleNotifications({
              type:'success', 
              title:'Successful Login!', 
              body:'Welcome to e-Conductor!.'
            });
          }
          else {
            handleNotifications({
              type: 'error',
              title: 'Authentication Failed!',
              body: 'Authentication failed. Please try again.'
            });
          }
      } catch (error) {
          console.error('Error adding user:', error);
          handleNotifications({
            type: 'warning',
            title: 'Network Error!',
            body: 'Network connection is unstable. Please reload page again.'
          });
      }      
    };

    if(Object.keys(userData.sessionData).length > 0){
      requestAccess(button);
    }
    else{
      handleNotifications({
        type: 'warning',
        title: 'Network Error!',
        body: 'Network connection is unstable. Please reload page again.'
      });
    }
  }

  // Handling rememberMe
  const handleRemember = () =>{
    setRemember(!remember);
    //console.log('Remember Me:',remember);
  }

  // Use effect for get the user id and email from our server
  const requestUserDetails = async (value) => {
    // Creating data object
    const data = {
      type: 'Req1', // User validation message
      data: value   // Mobile number of the user
    }
    //console.log(`request message::   type: ${data.type}      data: ${data.data}`);
  
    try {
        setLoading(true);  // Enabling spinner
        const serverResponse = await Request(data, 'users');
        const {userID, email, userType, empType} = serverResponse.data;
        console.log(`ServerUserId:: ${userID}    ServerUserEmail:: ${email}     serverUserType: ${userType}    serverEmpType: ${empType}`);
        setUserData({...userData, userID:userID, mobile:number, email:email, userType:userType, empType: empType});
    } catch (error) {
        console.error('Error adding user:', error);
    } finally {
      setLoading(false);  // Disabling spinner
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
        <label className='RememberMe' ><input type='checkbox' checked={remember} onChange={handleRemember}/> Remember me</label>
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

          <Button variant="light" name='google' onClick={handleClick} className='custombutton2'>
            <FcGoogle className='icon' /> Continue with Google
          </Button>
          {/* <Button variant="light" name='facebook' onClick={handleClick} className='custombutton2'>
            <FaFacebookF className='icon' /> Continue with Facebook
          </Button>
          <Button variant="light" name='apple' onClick={handleClick} className='custombutton2'>
            <FaApple className='icon' /> Continue with Apple
          </Button> */}
        </Container>
        <div className='register'>
          <p>Don't have an account? <Link to={`/signup`} >Register</Link> </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
