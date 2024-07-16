import React, { useEffect, useState } from 'react';
import { SweetEmail, SweetMultyInput, SweetPassword, SweetText } from './SweetInputs';
//import { SweetOTP } from './SweetInputs';
import {SweetOTP} from './SweetOTP';

const ParentComponent = () => {
  const [output, setOutput] = useState('');

  useEffect(()=>{
    console.log(`OutputL:: ${JSON.stringify(output)}`);
  },[output])

  const openEmailInput = () => {
    SweetEmail({
      onChange: setOutput
    });
  };


  const handleButton = (e) =>{
    console.log(`Button Clicked:: ${JSON.stringify(e)}`);
  }

  const openPasswordInput = () => {
    SweetPassword({
      title: "Enter your password",
      inputLabel: "Password",
      inputPlaceholder: "password",
      onChange: setOutput,
      onClick: handleButton
    });
  };



  const openOTPInput = () => {
    SweetOTP({
      title: "Enter your password",
      inputLabel: "OTP",
      //onClick: handleButton,
      timer: 10
    });
  };

  const openTextInput = () => {
    SweetText({
      title: "Enter your password",
      inputLabel: "Password",
      onChange: setOutput
    });
  };

  const openMultyInput = () => {
    SweetMultyInput({
      title: "Enter your password",
      onChange: setOutput
    });
  };

  return (
    <div style={{backgroundColor: '#ffffff'}}>
      <button onClick={openEmailInput}>Open Email Input</button>
      <button onClick={openOTPInput}>Open OTP Input</button>
      <button onClick={openPasswordInput}>Open Password Input</button>
      <button onClick={openTextInput}>Open Text Input</button>
      <button onClick={openMultyInput}>Open Multy Input</button>
      <p>Entered Value: {output}</p>
    </div>
  );
};

export default ParentComponent;
