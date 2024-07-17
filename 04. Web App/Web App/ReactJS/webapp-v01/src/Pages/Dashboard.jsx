import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Menu from '../Components/Dashboard/MenuBar'
import { Outlet } from 'react-router-dom'
import './Dashboard.css'


export default function Dashboard({ setIsLogged, language, setLoading }) {

  return (
    <div className='dashboardPage'>

      <Row className='dashboardArea'>
        <Col className='menu'>
          <Menu setIsLogged={setIsLogged} language={language} setLoading={setLoading} />
        </Col>

        <Col className='content'>
          <Outlet/>
        </Col> 
      </Row>

    </div>
  )
}
