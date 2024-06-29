import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './SignUpForm2.css'
import { Container } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import { GoPasskeyFill } from 'react-icons/go';

export default function SignUp1() {
  const [number, setNumber] = useState('');

  return (

    <div className='signup-wrapper2'>
      <h1>Sign Up</h1>
      <Form className='signupForm2'>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="John" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Doe" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} className="mb-3" controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="JohnDoe@gmail.com" />
          </Form.Group>

          <Form.Group as={Col}className="mb-3" controlId="formGridEmail">
            <Form.Label>Mobile Number</Form.Label>
            <Container className='input-box'>
              <PhoneInput
                country={'lk'}
                value={number}
                onlyCountries={['lk']}
                countryCodeEditable={false}
                onChange={setNumber}
                inputProps={{
                  maxLength: 15 // Country code (3) + 9 digits + 3 spaces
                }}
              />
              <GoPasskeyFill className='user-with-key' />
            </Container>
          </Form.Group>
        </Row>
        
        <Form.Group className="mb-3" controlId="formGridBirthDay">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
