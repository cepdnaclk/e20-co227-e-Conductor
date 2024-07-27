import React, { useEffect, useState } from 'react';
import './Components.css'
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import image from '../../Images/logo - Bkgrnd.jpg'
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import CommuteTwoToneIcon from '@mui/icons-material/CommuteTwoTone';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import { useNavigate } from 'react-router-dom';
import { Request } from '../../APIs/NodeBackend';

function General({ language, setLoading }) {
  const navigate = useNavigate();

  // Getting userID from local storage
  const userID = JSON.parse(localStorage.getItem('userId') || JSON.parse(sessionStorage.getItem('userId')));

  // Getting userData from node backend
  const [data, setData] = useState({});

  // Requesting device data from node backend
  useEffect(()=>{
    const getData = async (value) => {
      // Creating data object
      const data = {
        type: 'Req4', // Get user infomation from backend
        data: value
      }
      //console.log(`request message::   type: ${data.type}      data: ${data.data}`);
  
      try {
          setLoading(true);  // Enabling spinner
          const serverResponse = await Request(data, 'users');
          //console.log(`General infomation:: ${JSON.stringify(serverResponse.data)}`);
          setData(serverResponse.data);
      } catch (error) {
          console.error('Error fetching devices:', error);
      } finally{
          setLoading(false);  // Disabling spinner
      }
    };

    getData(userID);
  }, [])

  return (
    <div className='contentArea'>
      <div className='user-info-container'>
        <Row>          
          <Col xs={12} md={4} lg={2} className='profile-pic'>
            <Container>
              <Image src={image} width={'115px'} roundedCircle />
            </Container>
          </Col>
          

          <Col xs={12} md={8} lg={9} className='user-info'>
            <Row >
              <Col xs={12} lg={6} xxl={5} className='name-box'>
                <h1>{data.name}</h1>
                <h4>( {data.userType} )</h4>
              </Col>              

              <Col xs={12} lg={6} xxl={7} className='contact--row'>
                <Row >
                  <Col  xs={12} xxl={8} className='name-box'>
                    <h6><EmailIcon style={{ margin: '0 5px 0 0' }} /> {data.email}</h6>
                    <h6><CallIcon style={{ margin: '0 5px 0 0' }} /> {data.mobile}</h6>
                  </Col>
                  
                  <Col  xs={12} xxl={4} style={{ width: '160px', justifyContent:'center', alignItems:'center', display:'flex'}} >
                    <Button variant='dark' className='dash-button' id='settings' onClick={()=>{navigate('/dashboard/settings')}}>
                        Edit Profile</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className='quick-Access-Container'>
        <Row>
          <Col >
            <CommuteTwoToneIcon className='card-icon'/>
            <Container>
              <span>Total Rides</span>
              {data.rides}
              <Button variant='dark' className='dash-button' onClick={()=>{navigate('/booking')}}>New Ride</Button>
            </Container>
          </Col>
          <Col>
            <LocalActivityOutlinedIcon className='card-icon'/>
            <Container>
              <span>Available Tickets</span>
              {data.tickets}
              <Button variant='dark' className='dash-button' id='tickets' onClick={()=>{navigate('/avtickets')}}>Use Now</Button>
            </Container>
          </Col>
          <Col>
            <PaidOutlinedIcon className='card-icon'/>
            <Container>
              <span>Available Credits</span>
              LKR {data.credits || 0}
              <Button variant='dark' className='dash-button' onClick={()=>{navigate('/topup')}}>Top-Up</Button>
            </Container>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default General
