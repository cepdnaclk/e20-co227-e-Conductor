/*
  Title: Navigation Bar
  Customized by: BG
  Last Modified: 21/05/2024
*/

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';

function NavScrollExample() {
  return (
    <Navbar expand="lg" sticky="top" className="header">
      <Container fluid>        
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
