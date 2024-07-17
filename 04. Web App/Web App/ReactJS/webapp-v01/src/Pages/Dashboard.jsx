import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Menu from '../Components/Dashboard/MenuBar'
import './Dashboard.css'
import { Outlet } from 'react-router-dom'


export default function Dashboard({ setIsLogged, language }) {

  return (
    <div className='dashboardPage'>

      <Row className='dashboardArea'>
        <Col className='menu'>
          <Menu setIsLogged={setIsLogged} language={language} />
        </Col>

        <Col className='content'>
          <Outlet/>
        </Col> 
      </Row>
      
    </div>
  )
}