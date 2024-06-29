import React from 'react'
import Navbar from '../Components/Navbars/Navbar2'
import Footer from '../Components/Footer/Footer2'

export default function About({ language, setLanguage }) {
  return (
    <div className='body'>
      <Navbar page = 'About' language={language} setLanguage={setLanguage}/>
      <h1>ABOUT</h1>
      <h3>Language: {language} </h3>
      <Footer/>  
    </div>
  )
}



