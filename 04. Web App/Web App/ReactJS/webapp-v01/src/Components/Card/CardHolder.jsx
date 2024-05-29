import Card from './Card1'
import { Container, Row } from 'react-bootstrap';
import './CardHolder.css'
import Im1 from '../../Images/passenger.jpg'
import Im2 from '../../Images/Driver2.jpg'
import Im3 from '../../Images/Busowner.jpg'
import { useState } from 'react';


export default function Holder({Response}) {
    // Handle child response
    const HandleResponse = (value) =>{
        Response(value);
    }

    return (
    <Container className='Card-div'>
        <h1>Sign Up</h1>
        <Row className="CardHolder">
          <Card 
            event = '1'
            image={Im1}
            topic='As a Passenger'
            description='Best palce to get a comfatable and secure ride.'
            buttonText='Continue'
            sendResponse={HandleResponse}
          />

          <Card 
            event = '2'
            image={Im2}
            topic='As a Driver/ Conductor'
            description='Best palce to provide modern and a enjoyable service.'
            buttonText='Continue'
            sendResponse={HandleResponse}
          />

          <Card 
            event = '3'
            image={Im3}
            topic='As a Bus Owner'
            description='Find your all incomes and monitor your busses freely. '
            buttonText='Continue'
            sendResponse={HandleResponse}
          />
        </Row>  
      </Container>
    )
  }


