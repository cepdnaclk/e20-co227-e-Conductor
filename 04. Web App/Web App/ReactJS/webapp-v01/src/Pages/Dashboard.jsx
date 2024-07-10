import React from 'react'
import Navbar from '../Components/Navbars/Navbar2'
import Footer from '../Components/Footer/Footer2'
import { Col, Row } from 'react-bootstrap'
import Menu from '../Components/Dashboard/MenuBar'
import './Dashboard.css'
import { Outlet } from 'react-router-dom'


export default function Dashboard({ isLogged, setIsLogged, language, setLanguage, setAllowNavigate }) {

  return (
    <div className='dashboardPage'>
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} language={language} setLanguage={setLanguage} setAllowNavigate={setAllowNavigate}/>

      <Row className='dashboardArea'>
        <Col className='menu'>
          <Menu setIsLogged={setIsLogged} language={language} setAllowNavigate={setAllowNavigate}/>
        </Col>

        <Col className='content'>
          <Outlet/>
        </Col> 
      </Row>
      
      <Footer/>  
    </div>
  )
}
