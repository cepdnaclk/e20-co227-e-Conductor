import React from 'react'
import Navbar from '../Components/Navbars/Navbar2'
import Footer from '../Components/Footer/Footer2'
import './Home.css'

export default function Settings({ language, setLanguage }) {

  return (
    <div >
      <Navbar language={language} setLanguage={setLanguage}/>
      <h1>SETTINGS</h1>
      <h3>Language: {language} </h3>
      <Footer/>  
    </div>
  )
}
