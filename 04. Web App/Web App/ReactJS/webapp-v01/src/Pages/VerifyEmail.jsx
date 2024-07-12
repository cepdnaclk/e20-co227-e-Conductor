import React from 'react'
import './Home.css'

export default function VerifyEmail({ language }) {

  return (
    <div >
      <h1>VERIFICATION PAGE</h1>
      <h2>Please Verify Your Email.<br/>The link is send to your email</h2>
      <h3>Language: {language} </h3>
    </div>
  )
}
