import React, { useState } from 'react';
import RegistrationForm from '../Components/SignupForm/SignUpForm1';
import CardHolder from '../Components/Card/CardHolder';
import OTP from '../Components/OTPForm/EmailMobileOTP1';
import './Signin.css';

export default function Signup({ language }) {
  // Variable for current status of the page
  const [pageState, setPageState] = useState('0');

  // Variable to store user data
  const [data, setData] = useState({
    role      : '',
    fName     : '',
    lName     : '',
    email     : '',
    mobile    : '',
    nic       : '',
    birthDay  : '',
    ntc       : '',
    licence   : '',
    accName   : '',
    accNo     : '',
    bank      : "Peoples' Bank",
    branch    : '',
    licenceFile: [], 
    passbook  : null
  });

  // Handler for new data
  function handleData(newData) {
    setData(newData);
    /*
    console.log("Parent Page: ");
    console.log(newData);
    console.log('Page: ' + pageState);
    */
  }

  return (
    <div className='Login-body'>
      { pageState==='0' ? (
        <CardHolder Response={setPageState}/>
      ):(
        <>
          { pageState === '4' ? 
            ( <OTP formData={data} language={language} sendResponse={setPageState} /> ) : 
            ( <RegistrationForm Data={data} userType={pageState} Response={setPageState} userData={handleData} language={language}/> )
          }
        </>               
      )
      }

      
    </div>
  )
}
