import React from 'react'
import Navbar from '../Components/Navbars/Navbar2'
import Footer from '../Components/Footer/Footer2'
import './Home.css'

export default function Home({isLogged, setIsLogged, language, setLanguage, setAllowNavigate }) {

  return (
    <div >
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} page = 'Home' language={language} setLanguage={setLanguage} setAllowNavigate={setAllowNavigate}/>
      <h1>HOME</h1>
      <h3>Language: {language} </h3>
      <Footer/>  
    </div>
  )
}
