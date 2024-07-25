import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container} from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import { Request } from '../../APIs/NodeBackend';
import './SignUpForm1.css'
import { handleNotifications } from '../MyNotifications/FloatingNotifications';
import { Link } from 'react-router-dom';


export default function SignUp1({Data, userType, Response, userData, language, setLoading}) {
  // Empty Data set
  const emptyData = {
    userType  : userType,
    empType   : 'None',
    fName     : '', 
    lName     : '',
    email     : '',
    mobile    : '94',
    nic       : '',
    birthDay  : '',
    ntc       : '',
    licence   : '',
    accName   : '',
    accNo     : '',
    bank      : "Peoples' Bank",
    branch    : '',
    /* licenceFile: [], 
    passbook: null */
  }

  // Special Input fileds
  const specialFields = ["nic", "ntc", "licence", "branch", "accNo"];

  // Object to store form data
  const [formData, setFormData] = useState( (userType === Data.userType) ? Data : emptyData);

  // Variable to check the availability of the continue button
  const [isDisable, setIsDisable] = useState(true);

  // Variable to check the validity of given data
  const [isValid, setIsValid] = useState(false);

  // Object to store errors
  const [formErrors, setFormErrors] = useState({});

  // Variable for user availability
  const [isAvailable, setIsAvailable] = useState('none');

  // Variable for hold the employee type
  const [isEmployee, setIsEmployee] = useState((userType==='employee')||(userType==='owner' && formData.empType !== 'None') ? true : false);
  const [EmpType, setEmpType] = useState((isEmployee) ? 'Conductor' : 'None') 
  /* Note:: EmpTypes None, Conductor, Driver, Both */

  // Handle Employees
  const handleEmployee = (e) =>{
    setIsEmployee(e.target.checked); // Do a change here previous value is:: setEmployee(!isEmployee);
    setEmpType( e.target.checked? 'Conductor' : 'None');
  }
  
  // Handle EmpType
  const handleEmpType = (e) => {
    setEmpType(e.target.value);
  }

  // Check user availability
  const userAvailability = async(value) =>{
    // Creating data object
    const data = {
      type: 'Req2', // user availability
      data: value
    }
    //console.log(`New rquest:: type: ${data.type}   mobile: ${data.data.mobile}   email: ${data.data.email}`);
    try {
      setLoading(true);  // Enabling spinner
      const serverResponse = await Request(data, 'users');
      console.log(`User availability:: ${serverResponse.data}`);
      setIsAvailable(serverResponse.data);
    } catch (error) {
      console.error('Error checking availability:', error);
    } finally {
      setLoading(false);  // Disabling spinner
    }
  }

  // Handling form data
  const handleFormData = (e) =>{
    const { name, value } = e.target;
    const newValue = specialFields.includes(name) ? value.toUpperCase() : value ;
    //console.log(`newValues: ${JSON.stringify(newValue)}`);
    setFormData({ ...formData, [name]: newValue });
  }

  /* // Handling driving licence file change
  const handleDrivingLicenceFileChange = (e) => {
    setFormData({ ...formData, licenceFile: e.target.files });
  };

  // Handling bank passbook file change
  const handleBankPassbookFileChange = (e) => {
    //console.log(`passbook: ${JSON.stringify(e.target.files)}`);
    setFormData({ ...formData, passbook: e.target.files[0] });
  }; */

  // Handling submit button  
  const handleSubmit = (e) =>{
    e.preventDefault();                                              // Disable default behavior of a form 
    setFormData({...formData, userType:userType, empType:EmpType});  // Update role of the user
    setFormErrors(validate(formData));                               // Checking validity of the form
  }

  // Handling availability of user
  useEffect(()=>{
    //console.log(`useEffect: ${isAvailable}\nData: ${JSON.stringify(formData)}`);
    // User email and phone number is available to use
    if(isAvailable==='true'){
      //console.log(`Ready to submit form: \n${JSON.stringify(formData)}`);
      userData(formData); // Send form data to the parent
      Response('4');      // Send next page state to the parent
    }
    // User email or phone number is not available to use
    else if(isAvailable==='false'){
      handleNotifications({
        type: 'error',
        title: 'Email/Mobile Number Already Exists!',
        body: 'Email or mobile number already exists. Please change email/mobile number.'
      })
      setIsAvailable('none'); // Default case
      setIsValid(false);      // New data need to be validated
      setFormData(emptyData); // Reset form
      setIsDisable(true);     // Reset accepting terms and conditions
    }
    // Bad response may be a connection issue
    else if(isAvailable !== 'none'){
      handleNotifications({
        type: 'warning',
        title: 'Network Error!',
        body: 'Your connection is unstable. Please reload page again.'
      })
      setIsAvailable('none'); // Default case
      setIsValid(false);      // New data need to be validated
      setFormData(emptyData); // Reset form
      setIsDisable(true);     // Reset accepting terms and conditions
    }
  },[isAvailable])

  // Handling the is employee checkbox
  useEffect(()=>{
    if(!isEmployee){
      setFormData({...formData, ntc: '', licence: '', licenceFile: []});
    }
  }, [isEmployee])

  
  useEffect(()=>{
    if(isValid === true){     
      // Check user availability
      userAvailability({mobile: formData.mobile, email: formData.email})  
    }
  }, [isValid])

  // Handling back button
  const handleBack = () =>{
    Response('0');
  }

  /*// Handing accept rules
  const handleAcceptRules = () =>{
    setIsDisable(!isDisable);
  } */

  // Function to extract birthday from NIC
  function getBirthDateFromNIC(nic) {
    let year, dayOfYear;
  
    if (nic.length === 10) { // Old NIC format
      year = parseInt(nic.substring(0, 2), 10);
      dayOfYear = parseInt(nic.substring(2, 5), 10);
      year = year >= 0 && year <= 99 ? (year + 1900) : (year + 2000);
    } 
    else if (nic.length === 12) { // New NIC format
      year = parseInt(nic.substring(0, 4), 10);
      dayOfYear = parseInt(nic.substring(4, 7), 10);
    } 
    else {
      return null; // Invalid NIC number
    }
  
    // Handle female NIC numbers
    if (dayOfYear > 500) {
      dayOfYear -= 500;
    }
  
    // Calculate the birth date
    const birthDate = new Date(2004, 0, dayOfYear);
    const birthYear = year;
    const birthMonth = ('0' + (birthDate.getMonth() + 1)).slice(-2);
    const birthDay = ('0' + birthDate.getDate()).slice(-2);
  
    return `${birthYear}-${birthMonth}-${birthDay}`;
  }
  
  // Function to validate NIC and birthday
  function validateNICAndBirthday(nic, birthday) {
    const extractedBirthday = getBirthDateFromNIC(nic);
    //alert("Birthday: " + birthday + "\nNIC BDay: " + extractedBirthday);
    if (extractedBirthday === null) {
      return false; // Invalid NIC number
    }
    return extractedBirthday === birthday;
  }
  
  // Handling validity of the form
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //console.log(`validating...\n${JSON.stringify(formData)}`);
    

    /* Common requirements */

    // First name validation
    if (!values.fName) { errors.fName = "* This field is required!"; }

    // Last name validation
    if (!values.lName) { errors.lName = "* This field is required!"; }

    // Email validation
    if (!values.email) { errors.email = "* This field is required!"; } 
    else if (!regex.test(values.email)) { errors.email = "* This is an invalid email format!"; }

    // Mobile number validation
    if (!values.mobile) { errors.mobile = "* This field is required!"; } 
    else if (values.mobile.length < 11) { errors.mobile = "* This is an invalid mobile number!"; }



    /* Requirements for Employees and Bus Owners */
    if(userType !== 'passenger'){

      // NIC & Birthday validation
      if (!values.nic || !values.birthDay) { errors.nic = "* Both fields are required!"; } 
      else if (!validateNICAndBirthday(values.nic, values.birthDay)) { errors.nic = "* This is a invalid NIC number or a birth day!"; }

      if(EmpType !== 'None'){
        // NTC Reg. No. Validation
        if (!values.ntc) { errors.ntc = "* This field is required!"; } 

        if (EmpType !== 'Conductor'){
          // Driving licence validation
          if (!values.licence) { errors.licence = "* This field is required!"; }

          /* // Driving licence validation
          if (!values.licenceFile.length) { errors.licenceFile = "* This field is required!"; }
          else if (values.licenceFile.length < 2) { errors.licenceFile = "* Please upload images of the both sides of your driving licence card as two separate files!"; } */
        }
      }
      

      /* Requirements for bus owners */
      if(userType === 'owner'){
        // Beneficiary's name validation
        if (!values.accName) { errors.accName = "* This field is required!"; }

        // Account number validation
        if (!values.accNo) { errors.accNo = "* This field is required!"; }

        // Branch validation
        if (!values.branch) { errors.branch = "* This field is required!"; }

        /* // Passbook validation
        if (!values.passbook) { errors.passbook = "* This field is required!"; } */
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
                maxLength={20}
                />
              <p>{formErrors.fName}</p>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLName">
              <Form.Label>Last name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Doe" 
                name='lName'
                value={formData.lName}
                onChange={handleFormData}
                maxLength={20}
              />
              <p>{formErrors.lName}</p>
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
              maxLength={50}
            />
            <p>{formErrors.email}</p>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridMobile">
            <Form.Label>Mobile number</Form.Label>            
            <PhoneInput
              country={'lk'}
              value={formData.mobile}
              onlyCountries={['lk']}
              countryCodeEditable={false}
              onChange={(e)=>{setFormData({ ...formData, mobile: e})}}
              inputProps={{
                maxLength: 15 // Country code (3) + 9 digits + 3 spaces
              }}
            />  
            <p>{formErrors.mobile}</p>          
          </Form.Group>

          {/* Requirements for employees and bus owners. */
            (userType === 'passenger') ? (<></>) : (
            <>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridNIC">
                  <Form.Label>NIC number</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="123456789123"
                    name='nic'
                    value={formData.nic}
                    onChange={handleFormData} 
                    maxLength={12}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridBirthDay">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control 
                    type="date" 
                    name='birthDay'
                    value={formData.birthDay}
                    onChange={handleFormData}
                    style={{cursor:'pointer'}}
                    min="1900-01-01"
                    max="2200-12-13"
                  />
                </Form.Group>
                <p className='signUpErrorMsg'>{formErrors.nic}</p> 
              </Row>
              
              {(userType !== 'owner') ? (<></>):(
                // Bus Owner
                <>
                  <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check 
                      type="checkbox" 
                      label="I hope to work as a conductor/ driver." 
                      checked = {isEmployee}
                      onChange={handleEmployee}
                      style={{cursor:'pointer'}}
                    />
                  </Form.Group>
                </>
              )}

              {(EmpType === 'None') ? (<></>):(
                // Work as an employer ?
                <>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState" >
                      <Form.Label>Work as</Form.Label>
                      <Form.Select 
                        onChange={handleEmpType}
                        style={{cursor:'pointer'}}
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
                        maxLength={15}
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
                      maxLength={15}
                    />
                    <p>{formErrors.licence}</p> 
                  </Form.Group>

                  {/* <Form.Group className="mb-3" controlId="formFileMultiple">
                    <Form.Label>Upload images of both sides of your driving license card<p>(accepted file formats .png, .jpg, .jpeg)</p></Form.Label>
                    <Form.Control 
                      className='customfile' 
                      name="licenceFile"
                      type="File"
                      accept=".png, .jpg, .jpeg" 
                      multiple 
                      onChange={handleDrivingLicenceFileChange}
                    />
                    <p>{formErrors.licenceFile}</p> 
                  </Form.Group> */}
                  
                </>
              )}

              {(userType !== 'owner') ? (<></>) : (
                <>
                  {/* Requirements for bus owners. */}
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
                      maxLength={30}
                    />
                    <p>{formErrors.accName}</p> 
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridAccNo">
                    <Form.Label>Account number</Form.Label>
                    <Form.Control
                      type="text" 
                      placeholder="123-456-789-123" 
                      name='accNo'
                      value={formData.accNo}
                      onChange={handleFormData}
                      maxLength={20}
                    />
                    <p>{formErrors.accNo}</p> 
                  </Form.Group>
                    
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridBank">
                      <Form.Label>Bank</Form.Label>
                      <Form.Select 
                        //defaultValue="Peoples' Bank"
                        name='bank'
                        value={formData.bank}
                        onChange={handleFormData}
                        style={{cursor:'pointer'}}
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
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridBranch">
                      <Form.Label>Branch</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Your Brach" 
                        name='branch'
                        value={formData.branch}
                        onChange={handleFormData}
                        maxLength={20}
                      />
                      <p>{formErrors.branch}</p> 
                    </Form.Group>

                  </Row>

                  {/* <Form.Group className="mb-3" controlId="formFileMultiple">
                    <Form.Label>Upload an image of your bank passbook<p>(accepted file formats .png, .jpg, .jpeg)</p></Form.Label>
                    <Form.Control 
                      className='customfile' 
                      type="File"
                      name="passbook"
                      accept=".png, .jpg, .jpeg" 
                      onChange={handleBankPassbookFileChange}
                    />
                    <p>{formErrors.passbook}</p> 
                  </Form.Group> */}
                </>)}
            </>)         
          }
          
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Container className='termsContainer'>
              <Form.Check type="checkbox" style={{cursor:'pointer'}} checked={!isDisable} onChange={()=>{setIsDisable(!isDisable)}} label="I accept all " /><Link to='/terms'> terms and conditions.</Link>
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

