/*
  Title: Navigation Bar
  Customized by: BG
  Last Modified: 05/06/2024
*/

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../../Images/logo - no bkgnd.png';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar1';
import './Navbar2.css';

function NavScrollExample({page, language, setLanguage, visitor, setVisitor}) {  
  const handleLanguage = (e) =>{
    setLanguage(e.target.id);
  }

  return (
    <Navbar expand="lg" sticky="top" className="navbar">
      <Container fluid>
        <Navbar.Brand href="/">
          <Image 
            src={logo}
            rounded
            className="logo"
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        
        <Navbar.Collapse id="navbarScroll">
          <Nav variant='underline' activeKey={page} className="navbar-nav" navbarScroll>
            
            <Nav.Link className="tab" eventKey="Home"     href="/">{language==='සිංහල' ? (<>මුල්පිටුව</>): (<>Home</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="About"    href="/en-about">{language==='සිංහල' ? (<>විස්තර</>): (<>About</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Booking"  href="/">{language==='සිංහල' ? (<>වෙන්කිරීම්</>): (<>Booking</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Schedule" href="/">{language==='සිංහල' ? (<>කාලසටහන්</>): (<>Schedule</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_5"   href="/">{language==='සිංහල' ? (<>5_පිටුව</>): (<>Page_5</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_6"   href="/">{language==='සිංහල' ? (<>6_පිටුව</>): (<>Page_6</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_7"   href="/">{language==='සිංහල' ? (<>7_පිටුව</>): (<>Page_7</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_8"   href="/">{language==='සිංහල' ? (<>8_පිටුව</>): (<>Page_8</>)}</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_9"   href="/">{language==='සිංහල' ? (<>9_පිටුව</>): (<>Page_9</>)}</Nav.Link>

            <Container fluid className='d-flex justify-content-between align-items-top'>
              <Dropdown>
                <Dropdown.Toggle className='dropdwn' variant='light' id="dropdown-basic">
                <b>{language}</b>
                </Dropdown.Toggle>
                <Dropdown.Menu>                
                  <Dropdown.Item id='සිංහල' onClick={handleLanguage}>සිංහල</Dropdown.Item>
                  <Dropdown.Item id='English' onClick={handleLanguage}>English</Dropdown.Item>
                  {/*<Dropdown.Item id='தமிழ்' onClick={handleLanguage}>தமிழ்</Dropdown.Item>*/}
                </Dropdown.Menu>
              </Dropdown>
              { visitor ? (
                <Button className='button' variant="dark" href='/en-signin'>{language==='සිංහල' ? (<>පුරන්න</>): (<>Login</>)}</Button>
                ):(
                  <ProfileAvatar language={language} setVisitor={e=>setVisitor(e)}/>
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
