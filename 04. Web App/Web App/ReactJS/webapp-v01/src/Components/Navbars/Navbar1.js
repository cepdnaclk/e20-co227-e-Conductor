/*
  Title: Navigation Bar
  Customized by: BG
  Last Modified: 17/05/2024
*/

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../../Images/logo - no bkgnd.png';
import './Navbar2.css';
import Header from './Header'

function NavScrollExample() {
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
          <Nav className="ml-auto navbar-nav" navbarScroll>
            <Nav.Link className="tab" href="/">HOME</Nav.Link>
            <Nav.Link className="tab" href="/">ABOUT</Nav.Link>
            <Nav.Link className="tab" href="/">BOOKING</Nav.Link>
            <Nav.Link className="tab" href="/">SCHEDULE</Nav.Link>
            <Nav.Link className="tab" href="/">PAGE5</Nav.Link>
            <Nav.Link className="tab" href="/">PAGE6</Nav.Link>
            <Nav.Link className="tab" href="/">PAGE7</Nav.Link>
            <Nav.Link className="tab" href="/">PAGE8</Nav.Link>
            <Nav.Link className="tab" href="/">PAGE9</Nav.Link>
          </Nav>  
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
