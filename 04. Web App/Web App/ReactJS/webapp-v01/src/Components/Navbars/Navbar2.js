/*
  Title: Navigation Bar
  Customized by: BG
  Last Modified: 17/05/2024
*/

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../Images/logo - no bkgnd.png';
import Image from 'react-bootstrap/Image';
import './Navbar2.css'

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid>
        
        <Navbar.Brand href="/">
          <Image 
            src={logo} rounded c
            className='logo'
            />
        </Navbar.Brand>
    
        <Navbar.Toggle aria-controls="navbarScroll"/>
        
        <Navbar.Collapse id="navbarScroll">
          <Nav className="pages" navbarScroll>
            <Nav.Link className='page' href="/">HOME</Nav.Link>
            <Nav.Link className='page' href="/">ABOUT</Nav.Link>
            <Nav.Link className='page' href="/">BOOKING</Nav.Link>
            <Nav.Link className='page' href="/">SCHEDULE</Nav.Link>
            <Nav.Link className='page' href="/">ADDME</Nav.Link>
            <Nav.Link className='page' href="/">ADDME</Nav.Link>
            <Nav.Link className='page' href="/">ADDME</Nav.Link>
            <Nav.Link className='page' href="/">ADDME</Nav.Link>
            <Nav.Link className='page' href="/">ADDME</Nav.Link>
            <Nav.Link className='page' href="/">ADDME</Nav.Link>
            <Nav.Link className='page' href="/">ADDME</Nav.Link>
          </Nav>  
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;