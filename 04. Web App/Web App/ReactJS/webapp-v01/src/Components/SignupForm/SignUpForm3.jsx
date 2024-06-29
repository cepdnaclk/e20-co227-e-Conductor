import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container} from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import './SignUpForm1.css'


export default function SignUp1({userType, Response, userData}) {
  // Variable to store mobile number
  const [number, setNumber] = useState('');

  // Variable to store form data
  const [formData, setFormData] = useState({
    role      : userType,
    fName     : '',
    lName     : '',
    email     : '',
    mobile    : '',
    nic       : '',
    birthDay  : '',
    ntc       : '',
    licence   : '',
    accName   : '',
    accNo     : '',
    bank      : '',
    branch    : ''
  });

  // Variable to check the availability of the continue button
  const [isDisable, setIsDisable] = useState(true);

  // Variable to check the validity of given data
  const [isValid, setIsValid] = useState(false);

  // Object to store errors
  const [formErrors, setFormErrors] = useState({});

  // Handling form data
  const handleFormData = (e) =>{
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    //console.log(formData);
  }

  // Handling submit button
  
  const handleSubmit = (e) =>{
    e.preventDefault();                            // Disable default behavior of a form 
    setFormData({ ...formData, mobile: number });  // Add mobile number
    setFormErrors(validate(formData));             // Checking validity of the form
    console.log("Form Data: " + formData);
    console.log("Form Errors: " + formErrors);

    if(isValid){      
      userData(formData); // Send form data to the parent
      Response('4');      // Send next page state to the parent
    }    
  }

  // Handling back button
  const handleBack = () =>{
    Response('0');
  }

  // Handing accept rules
  const handleAcceptRules = () =>{
    setIsDisable(!isDisable);
  } 
  
  // Handling validity of the form
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    /* Common requirements */
    if (!values.fName) {
      errors.fName = "* This field is required!";
    }

    if (!values.lName) {
      errors.lName = "* This field is required!";
    }

    if (!values.email) {
      errors.email = "* This field is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "* This is not a valid email format!";
    }

    if (!values.mobile) {
      errors.mobile = "* This field is required!";
    } else if (values.mobile.length < 11) {
      errors.mobile = "* This is not a valid mobile number in Sri Lanka!";
    }

    /* Requirements for Employees and Bus Owners */
    if(userType !== '1'){ // Check this later
      if (!values.nic) {
        errors.nic = "* This field is required!";
      } 
      else if (values.nic.length < 12) { // NIC validation implement here
        errors.mobile = "* This is not a valid NIC number in Sri Lanka!";
      }

      if (!values.birthDay) {
        errors.birthDay = "* This field is required!";
      } else if (values.mobile.length < 11) {                // Implement the bithday validation
        errors.mobile = "* This is not a valid bith day!";
      }


      /* Requirements for bus owners */
      if(userType === '3'){
        // Do this
      }
    }

    

    (Object.keys(errors).length === 0) ? setIsValid(true) : setIsValid(false); // Data validation is updated
    return errors;
  };

  return (

    <div className='signup-wrapper'>
      <h1>Sign Up</h1>
      <Container className='signupForm'>
        <Form>
          {/* Common Requirements */}
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFName">
              <Form.Label>First name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="John" 
                name='fName'
                value={formData.fName}
                onChange={handleFormData}
                />
              <p className='signUpErrorMsg'>{formErrors.fName}</p>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLName">
              <Form.Label>Last name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Doe" 
                name='lName'
                value={formData.lname}
                onChange={handleFormData}
              />
              <p className='signUpErrorMsg'>{formErrors.lName}</p>
            </Form.Group>
          </Row>
        
          <Form.Group className="mb-3" controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="JohnDoe@gmail.com"
              name='email'
              value={formData.email}
              onChange={handleFormData} 
            />
            <p className='signUpErrorMsg'>{formErrors.email}</p>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridMobile">
            <Form.Label>Mobile number</Form.Label>            
            <PhoneInput
              country={'lk'}
              value={formData.mobile}
              onlyCountries={['lk']}
              countryCodeEditable={false}
              onChange={setNumber}
              inputProps={{
                maxLength: 15 // Country code (3) + 9 digits + 3 spaces
              }}
            />  
            <p className='signUpErrorMsg'>{formErrors.mobile}</p>          
          </Form.Group>

          {/* Requirements for employees and bus owners. */}
          
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridNIC">
              <Form.Label>NIC number</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="123456789123"
                name='nic'
                value={formData.nic}
                onChange={handleFormData} 
                />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridBirthDay">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control 
                type="date" 
                name='birthDay'
                value={formData.birthDay}
                onChange={handleFormData}
                />
            </Form.Group>
          </Row>
          <p className='signUpErrorMsg'>{formErrors.nic}</p> 

          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check 
              type="checkbox" 
              label="I hope to work as a conductor/ driver." />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Work as</Form.Label>
              <Form.Select 
                defaultValue="Conductor">
                  <option>Driver</option>
                  <option>Conductor</option>
                  <option>Both</option>
              </Form.Select>
            </Form.Group>            
            
            <Form.Group as={Col} controlId="formGridNTC">
              <Form.Label>NTC registration no.</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="NTC - 1234"
                name='ntc'
                value={formData.ntc}
                onChange={handleFormData} 
              />
              <p>{formErrors.ntc}</p> 
            </Form.Group>            
          </Row>

          <Form.Group className="mb-3" controlId="formGridLicenceID">
            <Form.Label>Driving licence number</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="123456789123"
              name='licence'
              value={formData.licence}
              onChange={handleFormData}
            />
            <p className='signUpErrorMsg'>{formErrors.licence}</p> 
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFileMultiple">
            <Form.Label>Upload images of both sides of your driving license card</Form.Label>
            <Form.Control 
              className='customfile' 
              type="File" 
              multiple />
            <p className='signUpErrorMsg'>{formErrors.licenceFile}</p> 
          </Form.Group>

          <Form.Label className='details'>Bank Account Details</Form.Label>
          <hr/>

          <Form.Group className="mb-3" controlId="formGridName">
            <Form.Label>Beneficiary's name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="John Doe" 
              name='accName'
              value={formData.accName}
              onChange={handleFormData}
            />
            <p className='signUpErrorMsg'>{formErrors.accName}</p> 
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAccNo">
            <Form.Label>Account number</Form.Label>
            <Form.Control
              type="text" 
              placeholder="123-456-789-123" 
              name='accNo'
              value={formData.accNo}
              onChange={handleFormData}
            />
            <p className='signUpErrorMsg'>{formErrors.accNo}</p> 
          </Form.Group>
            
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridBank">
                <Form.Label>Bank</Form.Label>
                <Form.Select 
                  defaultValue="Peoples' Bank"
                  name='bank'
                  value={formData.bank}
                  onChange={handleFormData}
                >
                    <option>Peoples' Bank</option>
                    <option>Bank of Ceylon</option>
                    <option>Sampath Bank</option>
                    <option>Commercial Bank PLC</option>
                    <option>Seylan Bank PLC</option>
                    <option>HNB - Hatton National Bank</option>
                    <option>NTB - Nations Trust Bank</option>
                    <option>NDB - National Development Bank</option>
                    <option>NSB - National Saving Bank</option>
                </Form.Select>
                <p className='signUpErrorMsg'>{formErrors.bank}</p> 
              </Form.Group>

              <Form.Group as={Col} controlId="formGridBranch">
                <Form.Label>Branch</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Your Brach" 
                  name='branch'
                  value={formData.branch}
                  onChange={handleFormData}
                />
                <p className='signUpErrorMsg'>{formErrors.branch}</p> 
              </Form.Group>

          </Row>

          <Form.Group className="mb-3" controlId="formFileMultiple">
            <Form.Label>Upload an image of your bank passbook</Form.Label>
            <Form.Control className='customfile' type="File" />
            <p className='signUpErrorMsg'>{formErrors.passbook}</p> 
          </Form.Group>

          <Form.Group className="mb-3" id="formGridCheckbox">
            <Container className='termsContainer'>
              <Form.Check type="checkbox" checked={!isDisable} onChange={handleAcceptRules} label="I accept all " /><a href='/'> terms and conditions.</a>
            </Container>
          </Form.Group>
        </Form>
      </Container>

      <div className='btn-container'>
        <Button onClick={handleBack} variant='outline-light'>Back</Button>
        <Button onClick={handleSubmit} disabled={isDisable} variant='light'>Continue</Button>
      </div>
    </div>
  )
}
