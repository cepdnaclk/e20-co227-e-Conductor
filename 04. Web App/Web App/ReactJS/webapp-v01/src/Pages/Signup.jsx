import React, { useState } from 'react';
import RegistrationForm from '../Components/SignupForm/SignUpForm1';
import CardHolder from '../Components/Card/CardHolder';
import OTP from '../Components/OTPForm/EmailMobileOTP1';
import {MyBars} from '../Components/Spinners/Spinners'
import './Signin.css';

export default function Signup({ language }) {
  // Variable for current status of the page
  const [pageState, setPageState] = useState('0');

  // Variable for loading spinner
  const [loading, setLoading] = useState(false);

  // Variable to store user data
  const [data, setData] = useState({
    userType  : '',
    empType   : 'None',
    fName     : '',
    lName     : '',
    email     : '',
    mobile    : '94',
    nic       : '',
    birthDay  : '',
    ntc       : '',
    licence   : '',
    accName   : '',
    accNo     : '',
    bank      : "Peoples' Bank",
    branch    : '',
   /*  licenceFile: [], 
    passbook  : null */
  });

  // Handler for new data
  function handleData(newData) {
    setData(newData);
    //console.log(`Parent Page: ${JSON.stringify(newData)} \n page: ${pageState}`);
  }
/*
  useEffect(()=>{
    console.log(`page: ${pageState}`);
  },[pageState])
*/
  return (
    <div className='Login-body'>
      { pageState==='0' ? (
        <CardHolder Response={setPageState} language={language}/>
      ):(
        <>
          { pageState === '4' ? 
            ( <OTP formData={data} language={language} sendResponse={setPageState} setLoading={setLoading} /> ) : 
            ( <RegistrationForm Data={data} userType={pageState} Response={setPageState} userData={handleData} language={language} setLoading={setLoading} /> )
          }
        </>               
      )}
      {loading ? (<MyBars />) : (<></>)}      
    </div>
  )
}
