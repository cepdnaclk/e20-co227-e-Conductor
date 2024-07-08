import React from 'react'
import Navbar from '../Components/Navbars/Navbar2'
import Footer from '../Components/Footer/Footer2'
import './Home.css'

export default function Terms({ isLogged, setIsLogged, language, setLanguage }) {

  return (
    <div >
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} language={language} setLanguage={setLanguage}/>
      <h1>Terms and Conditions</h1>
      <h3>Language: {language} </h3>
      <Footer/>  
    </div>
  )
}
