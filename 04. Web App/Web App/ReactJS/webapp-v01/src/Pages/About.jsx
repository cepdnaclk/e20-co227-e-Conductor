import React from 'react'
import Navbar from '../Components/Navbars/Navbar2'
import Footer from '../Components/Footer/Footer2'

export default function About({isLogged, setIsLogged, language, setLanguage, setAllowNavigate }) {
  return (
    <div className='body'>
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} page = 'About' language={language} setLanguage={setLanguage} setAllowNavigate={setAllowNavigate}/>
      <h1>ABOUT</h1>
      <h3>Language: {language} </h3>
      <Footer/>  
    </div>
  )
}



