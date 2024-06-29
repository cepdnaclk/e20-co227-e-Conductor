import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbars/Navbar2'
import Footer from '../Components/Footer/Footer2'
import { Col, Row } from 'react-bootstrap'
import General from '../Components/Dashboard/General'
import Transactions from '../Components/Dashboard/Transactions'
import Tickets from '../Components/Dashboard/Tickets'
import Devices from '../Components/Dashboard/Devices'
import Menu from '../Components/Dashboard/MenuBar'
import Messages from '../Components/Dashboard/Messages'
import Settings from '../Components/Dashboard/Settings'
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
          {(()=>{
            switch (state) {
              case 'general':
                return (<General language={language} setState={setState}/>);
            
              case 'transactions':
                return (<Transactions language={language}/>);
          
              case 'tickets':
                return (<Tickets language={language}/>);
          
              case 'devices':
                return (<Devices language={language}/>);
          
              case 'messages':
                return (<Messages language={language}/>);
          
              case 'settings':
                return (<Settings language={language}/>);
          
              default:
                break;
            }
          })()}
        </Col>
      </Row>
      
      <Footer/>  
    </div>
  )
}



