/*
  Title: Navigation Bar
  Customized by: BG
  Last Modified: 21/05/2024
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

function NavScrollExample({page, pageLanguage, userType}) {  
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
            <Nav.Link className="tab" eventKey="Home"     href="/">Home</Nav.Link>
            <Nav.Link className="tab" eventKey="About"    href="/en-about">About</Nav.Link>
            <Nav.Link className="tab" eventKey="Booking"  href="/">Booking</Nav.Link>
            <Nav.Link className="tab" eventKey="Schedule" href="/">Schedule</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_5"   href="/">Page_5</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_6"   href="/">Page_6</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_7"   href="/">Page_7</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_8"   href="/">Page_8</Nav.Link>
            <Nav.Link className="tab" eventKey="Page_9"   href="/">Page_9</Nav.Link>

            <Container fluid className='d-flex justify-content-between align-items-top'>
              <Dropdown>
                <Dropdown.Toggle className='dropdwn' variant='light' id="dropdown-basic">
                <b>English</b>
                </Dropdown.Toggle>
                <Dropdown.Menu>                
                  <Dropdown.Item >සිංහල</Dropdown.Item>
                  <Dropdown.Item >English</Dropdown.Item>
                  <Dropdown.Item >தமிழ்</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button className='button' variant="dark" href='/en-signin'>Login</Button>
            </Container>
          </Nav>  
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
