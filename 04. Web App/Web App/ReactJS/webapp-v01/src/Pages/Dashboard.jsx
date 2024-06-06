import React from 'react'
import Navbar from '../Components/Navbars/Navbar2'
import Footer from '../Components/Footer/Footer2'
import './Home.css'

export default function Dashboard({ language, setLanguage }) {
  return (
    <div >
      <Navbar language={language} setLanguage={setLanguage}/>
      <h1>DASHBOARD</h1>
      <h3>Language: {language} </h3>
      <Footer/>  
    </div>
  )
}



