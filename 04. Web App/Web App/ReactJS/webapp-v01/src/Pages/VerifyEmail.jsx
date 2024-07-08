import React from 'react'
import Navbar from '../Components/Navbars/Navbar2'
import Footer from '../Components/Footer/Footer2'
import './Home.css'

export default function VerifyEmail({ isLogged, setIsLogged, language, setLanguage }) {

  return (
    <div >
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} language={language} setLanguage={setLanguage}/>
      <h1>VERIFICATION PAGE</h1>
      <h2>Please Verify Your Email.<br/>The link is send to your email</h2>
      <h3>Language: {language} </h3>
      <Footer/>  
    </div>
  )
}
