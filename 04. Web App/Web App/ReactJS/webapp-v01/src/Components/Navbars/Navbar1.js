import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import logo from '../../Images/logo - no bkgnd.png';
import './Navbar1.css';

function AlignmentExample() {
  return (
    <>   
      <Nav className="justify-content-end" activeKey="/">
        <Container className='container'>
            <Image 
            src={logo} rounded c
            className='logo'
            href = '/'
            />
        </Container>
          <Nav.Link className = 'tab' href="/">HOME</Nav.Link>
          <Nav.Link className = 'tab' href="/about">ABOUT</Nav.Link>
          <Nav.Link className = 'tab' href="/schedule">SCHEDULE</Nav.Link>
          <Nav.Link className = 'tab' href="/booking">BOOKING</Nav.Link>
          <Nav.Link className = 'tab' href="/tracking">TRACKING</Nav.Link>
      </Nav>
    </>
  );
}

export default AlignmentExample;