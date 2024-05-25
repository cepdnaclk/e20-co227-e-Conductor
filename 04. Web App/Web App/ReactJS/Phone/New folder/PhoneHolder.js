import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './PhoneHolder.css';  // Import the custom CSS
import { Button, Container, Row } from 'react-bootstrap';
import { GoPasskeyFill } from 'react-icons/go';

export default function PhoneHolder() {
  const [number, setNumber] = useState('');

  const submit = () => {
    alert('Mobile number: ' + number);
    // console.log('Mobile number: ' + number);
  };

  return (
    <Container className='Mobile-box'>
      <label>Enter your mobile number</label>
      
      <Container className='input-box'>
        <PhoneInput 
          country={'lk'}
          value={number}
          onlyCountries={['lk']}
          countryCodeEditable={false}
          onChange={setNumber}
        />
        <GoPasskeyFill className='user-with-key'/>
      </Container>

      <label className='Remember'><input type='checkbox'/> Rermember me</label>

      <Button 
        variant="light" 
        className='continue-button'
        type='sumbit'
        onClick={submit}
        ><b>Continue</b></Button>
    </Container>
  );
}
