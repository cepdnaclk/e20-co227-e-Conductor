import React from 'react'
import Navbar from '../Components/Navbars/Navbar2'
import Footer from '../Components/Footer/Footer2'
import './Home.css'

export default function Home({ language, setLanguage }) {

  return (
    <div >
      <Navbar page = 'Home' language={language} setLanguage={setLanguage}/>
      <h1>HOME</h1>
      <h3>Language: {language} </h3>
      <Footer/>  
    </div>
  )
}
