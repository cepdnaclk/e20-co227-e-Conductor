/*
  Title: Navigation Bar
  Customized by: BG
  Last Modified: 09/07/2024
  previous version is v7
*/

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../../Images/logo - no bkgnd.png';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import './Navbar2.css';
import { FaUserCircle } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
import { AiFillDashboard } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function NavScrollExample({isLogged, setIsLogged, page, language, setLanguage, setAllowNavigate}) {  
  const navigate = useNavigate();

  // Set prefer language in the local memory
  const handleLanguage = (e) => {
    setLanguage(e.target.id);
  };
  
  // Handle logout
  const logout = () => {
    setIsLogged(false);
    navigate('/');
  };

  // Handle navigate
  const handleNavigate = (path) => {
    //console.log(JSON.stringify(path));
    setAllowNavigate(true);
    navigate(path);
  }

  return (
    <Navbar expand="lg" sticky="top" className="navbar">
      <Container fluid>
        <Navbar.Brand href='/' >
          <Image 
            src={logo}
            rounded
            className="logo"
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        
        <Navbar.Collapse id="navbarScroll">
          <Nav variant='underline' activeKey={page} className="navbar-nav" navbarScroll>
            
            <Nav.Link className="tab" eventKey="Home"     onClick={() => handleNavigate('/')}        >{language==='sn' ? (<>මුල්පිටුව</>): (<>Home</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="About"    onClick={() => handleNavigate('/about')}   >{language==='sn' ? (<>විස්තර</>): (<>About</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Booking"  onClick={() => handleNavigate('/booking')} >{language==='sn' ? (<>වෙන්කිරීම්</>): (<>Booking</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Schedule" onClick={() => handleNavigate('/')}        >{language==='sn' ? (<>කාලසටහන්</>): (<>Schedule</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_5"   onClick={() => handleNavigate('/')}        >{language==='sn' ? (<>5_පිටුව</>): (<>Topups</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_6"   onClick={() => handleNavigate('/')}        >{language==='sn' ? (<>6_පිටුව</>): (<>Page_6</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_7"   onClick={() => handleNavigate('/')}        >{language==='sn' ? (<>7_පිටුව</>): (<>Page_7</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_8"   onClick={() => handleNavigate('/')}        >{language==='sn' ? (<>8_පිටුව</>): (<>Page_8</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_9"   onClick={() => handleNavigate('/')}        >{language==='sn' ? (<>9_පිටුව</>): (<>Page_9</>)}</Nav.Link>

            <Container fluid className='d-flex justify-content-between align-items-top'>
              <Dropdown>
                <Dropdown.Toggle className='dropdwn' variant='light' id="dropdown-basic">
                <b>{(language === 'sn') ? (<>සිංහල</>) : (<>English</>)}</b>
                </Dropdown.Toggle>
                <Dropdown.Menu>                
                  <Dropdown.Item id='sn' onClick={handleLanguage}>සිංහල</Dropdown.Item>
                  <Dropdown.Item id='en' onClick={handleLanguage}>English</Dropdown.Item>
                  {/*<Dropdown.Item id='தமிழ்' onClick={handleLanguage}>தமிழ்</Dropdown.Item>*/}
                </Dropdown.Menu>
              </Dropdown>
              { !isLogged ? (
                <Button className='button' variant="dark" onClick={() => handleNavigate('/signin')}>{language==='sn' ? (<>පුරන්න</>): (<>Login</>)}</Button>
                ):(
                  <Dropdown align='end'>
                    <Dropdown.Toggle className='dropdwn' variant='light'>
                    <FaUserCircle className='icon'/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>                
                      <Dropdown.Item onClick={() => handleNavigate('/dashboard')}><AiFillDashboard /> {language==='sn' ? (<>අයිතම පුවරුව</>): (<>Dashboard</>)}</Dropdown.Item>
                      <Dropdown.Item onClick={logout}><TbLogout /> {language==='sn' ? (<>ඉවත්වන්න</>): (<>Logout</>)}</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>                   
                )
              }
              
            </Container>
          </Nav>  
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
  );
}

export default NavScrollExample;
