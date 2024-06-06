import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbars/Navbar2'
import Footer from '../Components/Footer/Footer2'
import { Col, Row } from 'react-bootstrap'
import Content from '../Components/Dashboard/ContentContainer'
import Menu from '../Components/Dashboard/MenuBar'
import './Dashboard.css'

export default function Dashboard({ language, setLanguage }) {

  // To store current state of the dashboard
  const [state, setState] = useState('general');

  useEffect(()=>{
    console.log(`Dashboard State: ${state}`);  
  }, [state])

  const handleState = (e) => {
    setState(e);
  }

  return (
    <div className='dashboardPage'>
      <Navbar language={language} setLanguage={setLanguage}/>

      <Row className='dashboardArea'>
        <Col className='menu'>
          <Menu state={state} setState={handleState} language={language}/>
        </Col>
        <Col className='content'>
          <Content/>
        </Col>
      </Row>
      
      <Footer/>  
    </div>
  )
}



