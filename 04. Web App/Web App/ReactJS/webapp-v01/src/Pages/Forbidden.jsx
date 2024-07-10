import React from 'react'
import Footer from '../Components/Footer/Footer2'
import Navbar from '../Components/Navbars/Navbar2'

export default function Forbidden({isLogged, setIsLogged, language, setLanguage, setAllowNavigate}) {
  return (
    <div className='body'>
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} language={language} setLanguage={setLanguage} setAllowNavigate={setAllowNavigate}/>
      <h1>OOPS!!! 404 FORBIDDEN</h1>
      <Footer/>  
    </div>
  )
}



