import React from 'react'
import Navbar from '../Components/Navbars/Navbar2'
import Footer from '../Components/Footer/Footer2'

export default function Topups({ language, setLanguage }) {
  return (
    <div className='body'>
      <Navbar language={language} setLanguage={setLanguage}/>
      <h1>TOP-UPS</h1>
      <h3>Language: {language} </h3>
      <Footer/>  
    </div>
  )
}



