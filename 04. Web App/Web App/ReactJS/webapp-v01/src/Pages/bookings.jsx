import React from 'react'
import Navbar from '../Components/Navbars/Navbar2'
import Footer from '../Components/Footer/Footer2'
import './Home.css'

export default function Bookings({ language, setLanguage }) {

  return (
    <div >
      <Navbar page = 'Booking' language={language} setLanguage={setLanguage}/>
      <h1>BOOKINGS</h1>
      <h3>Language: {language} </h3>
      <Footer/>  
    </div>
  )
}
