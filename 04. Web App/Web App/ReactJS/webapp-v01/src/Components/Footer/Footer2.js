import React, { useEffect, useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { FaEnvelope, FaFacebook, FaFacebookMessenger, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaWhatsappSquare, FaYoutube } from "react-icons/fa";
import './Footer2.css';
import { FaXTwitter } from 'react-icons/fa6';
import logo from '../../Images/logo - no bkgnd.png'
import { Link, useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  const specialPages = ["signin", "signup", "invoice"];  // Hide Nav bar for this pages

  // Identify current page
  const [page, setPage] = useState('home');

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    //console.log(`page: ${path}`);
    setPage(path);
  }, [location.pathname]);

  return (
    specialPages.includes(page) ? (<></>):(
      <footer className="footer">
        <Row className="custom">
          
          <Col sm={6} md={3} className="footer-column-logo">
            <Image className='ourlogo' src={logo} rounded />
          </Col>

          
          <Col sm={6} md={3} className="footer-column">
            <h5><b>Company</b></h5>
            <ul>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
              <li><Link to="/news">Newsroom</Link></li>
              <li><Link to="/help">Help</Link></li>
              <li><Link to="/terms">Terms & conditions</Link></li>
            </ul>
          </Col>


          <Col sm={6} md={3} className="footer-column">
            <h5><b>Contact Us</b></h5>
            <ul>
              <li><a href='tel:+94784938615'><FaPhoneAlt/> +94 78-4938615</a></li>
              <li><a href='https://wa.me/+94784938615'><FaWhatsappSquare/> +94 78-4938615</a></li>
              <li><a href='mailto:econductorinfo@gmail.com'><FaEnvelope/> econductorinfo@gmail.com</a></li>
              <li><a href='https://maps.app.goo.gl/VQWhfTgMwWzEDQDh8'><FaMapMarkerAlt/> Faculty of Engineering,<br/>
                University of Peradeniya,<br/>Prof. E. O. E. Pereira Mawatha,<br/>Kandy, <br/>Sri Lanka<br/></a></li>
            </ul>
          </Col>


          <Col sm={6} md={3} className="footer-column">
            <h5><b>Follow Us</b></h5>
            <ul>
              <li><a href='https://www.facebook.com/'><FaFacebook/> Facebook</a></li>
              <li><a href='https://www.messenger.com/'><FaFacebookMessenger/> Messenger</a></li>
              <li><a href='https://x.com/'><FaXTwitter/> X (Twitter)</a></li>
              <li><a href='https://www.linkedin.com/'><FaLinkedin/> LinkedIn</a></li>
              <li><a href='https://www.youtube.com/'><FaYoutube/> YouTube</a></li>
              <li><a href='https://www.instagram.com/'><FaInstagram/> Instagram</a></li>
            </ul>
          </Col>

        </Row>

        <Row>
          <Col className="text-center mt-3">
            <p>Copyright &copy; {new Date().getFullYear()} e-Conductor. All rights reserved.</p>
          </Col>
        </Row>
      </footer>
    )
  );
}

export default Footer;
