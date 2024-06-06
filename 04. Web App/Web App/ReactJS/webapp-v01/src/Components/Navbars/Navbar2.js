/*
  Title: Navigation Bar
  Customized by: BG
  Last Modified: 05/06/2024
  previous version is v6
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
import { RiSettings3Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function NavScrollExample({page, language, setLanguage}) {  
  const navigate = useNavigate();

  const localUser = JSON.parse(localStorage.getItem('userId'));
  const isUser = (localUser === null || localUser.length !== 5) ? false : true;

  // Set prefer language in the local memory
  const handleLanguage = (e) => {
    const newLanguage = e.target.id;
    localStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
    console.log(`UserID: ${localUser}       isUser: ${isUser}`);
  };

  
  // Update the user ID in the local memory
  const handleUser = () => {
    localStorage.removeItem('userId');
    navigate('/');
    console.log(`UserID: ${localUser}       isUser: ${isUser}`);
  };
  

  return (
    <Navbar expand="lg" sticky="top" className="navbar">
      <Container fluid>
        <Navbar.Brand href='/'>
          <Image 
            src={logo}
            rounded
            className="logo"
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        
        <Navbar.Collapse id="navbarScroll">
          <Nav variant='underline' activeKey={page} className="navbar-nav" navbarScroll>
            
            <Nav.Link className="tab" eventKey="Home"     href='/'      >{language==='sn' ? (<>මුල්පිටුව</>): (<>Home</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="About"    href='/about' >{language==='sn' ? (<>විස්තර</>): (<>About</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Booking"  href='/'      >{language==='sn' ? (<>වෙන්කිරීම්</>): (<>Booking</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Schedule" href='/'      >{language==='sn' ? (<>කාලසටහන්</>): (<>Schedule</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_5"   href='/'      >{language==='sn' ? (<>5_පිටුව</>): (<>Page_5</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_6"   href='/'      >{language==='sn' ? (<>6_පිටුව</>): (<>Page_6</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_7"   href='/'      >{language==='sn' ? (<>7_පිටුව</>): (<>Page_7</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_8"   href='/'      >{language==='sn' ? (<>8_පිටුව</>): (<>Page_8</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_9"   href='/'      >{language==='sn' ? (<>9_පිටුව</>): (<>Page_9</>)}</Nav.Link>

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
              { !isUser ? (
                <Button className='button' variant="dark" href='/signin'>{language==='sn' ? (<>පුරන්න</>): (<>Login</>)}</Button>
                ):(
                  <Dropdown align='end'>
                    <Dropdown.Toggle className='dropdwn' variant='light'>
                    <FaUserCircle className='icon'/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>                
                      <Dropdown.Item href='/dashboard'><AiFillDashboard /> {language==='sn' ? (<>අයිතම පුවරුව</>): (<>Dashboard</>)}</Dropdown.Item>
                      <Dropdown.Item href='/settings'><RiSettings3Fill /> {language==='sn' ? (<>සැකසුම්</>): (<>Settings</>)}</Dropdown.Item>
                      <Dropdown.Item onClick={handleUser}><TbLogout /> {language==='sn' ? (<>ඉවත්වන්න</>): (<>Logout</>)}</Dropdown.Item>
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
