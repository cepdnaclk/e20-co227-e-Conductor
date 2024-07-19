import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper, FormControl, InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { MuiTelInput } from 'mui-tel-input';
import { Col, Container, Row } from 'react-bootstrap';
import { Request } from '../../APIs/NodeBackend';
import { AndroidSwitch } from '../InputItems/Switches';
import { ToastAlert } from '../MyNotifications/WindowAlerts';
import RadioInput from '../InputItems/RadioInput';
import { SweetOTP } from '../MyNotifications/SweetInputs';
import './Components.css'

// User Types
const userTypes = ['passenger', 'employee', 'owner'];

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

function Settings({ language, setLoading }) {
  const navigate = useNavigate();
  const timer = 120; // in seconds
  const toUpperSet = ["nic", "ntc", "licence", "accNo", "branch"];

  // Variable to store updated data
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});

  // Variable to check the validity of given data
  const [isValid, setIsValid] = useState('none');

  // Object to store errors
  const [formErrors, setFormErrors] = useState({}); 

  // Variable to store user type
  const [role, setRole] = useState();

  // Variable to store employee type
  const [empType, setEmpType] = useState();

  // Variable to store mobile number
  const [mobile, setMobile] = useState();

  // Variable to monitor accountType button state
  const [isClicked, setIsClicked] = useState();

  // Variable to identify form is submitted or not
  const [isSubmitted, setIsSubmitted] = useState();

  // API to get user Data from backend
  useEffect(()=>{
    const fetch = async(userID) =>{
      // Creating data object
      const data = {
        type: 'Req5',
        data: userID
      }
      
      //console.log(`request message::   type: ${data.type}      data: ${data.data}`);

      try {
        setLoading(true);  // Enabling spinner
        const serverResponse = await Request(data, 'users');
        //console.log(`Server Response:: ${JSON.stringify(serverResponse.data)}`);
        setUserData(serverResponse.data);
      } catch (error) {
        console.error('Error adding user:', error);
      } finally {
        setLoading(false);  // Disabling spinner
      }
    }

    const id = (localStorage.getItem('userId') || sessionStorage.getItem('userId'));
    if(id !== null){
      fetch(id);
    }
    else{
      ToastAlert({
        type: 'warning',
        title: 'Somthing went wrong! Please reload page again.',
        /*onClose: Do something */
      });
    }
  },[]);

  // Initial Reset
  useEffect(()=>{
    if(Object.keys(userData).length > 0){
      handleReset()
    }
  },[userData]);

  // Form Data validation
  useEffect(()=>{
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
      if(role !== 'passenger'){
    
        // NIC & Birthday validation
        if (!values.nic || !values.birthDay) { errors.nic = "* Both fields are required!"; } 
        else if (!validateNICAndBirthday(values.nic, values.birthDay)) { errors.nic = "* This is a invalid NIC number or a birth day!"; }
    
        if(empType !== 'None'){
          // NTC Reg. No. Validation
          if (!values.ntc) { errors.ntc = "* This field is required!"; } 
    
          if (empType !== 'Conductor'){
            // Driving licence validation
            if (!values.licence) { errors.licence = "* This field is required!"; }
          }
        }
        
    
        /* Requirements for bus owners */
        if(role === 'owner'){
          // Beneficiary's name validation
          if (!values.accName) { errors.accName = "* This field is required!"; }
    
          // Account number validation
          if (!values.accNo) { errors.accNo = "* This field is required!"; }
    
          // Branch validation
          if (!values.branch) { errors.branch = "* This field is required!"; }
        }
      }
      
      setFormErrors(errors);
      if (Object.keys(errors).length > 0) {
        setIsSubmitted(false);
      }
      else{
        chkAvailability(formData);
      }
    };

    if (isSubmitted === true){ 
      //console.log('validating');
      validate(formData); 
    };  
  },[isSubmitted, formData]);

  useEffect(()=>{
    //console.log(`isValid :: ${isValid}`);

    const handleOTP = ({ button, value, origin }) => {
      //console.log(`${button} is Clicked. Value is: ${value} origin: ${origin}`);
      switch (button) {
        case 'confirm': {
          verifyOTP({value, origin, email: formData.email, mobile: formData.mobile});
          break;
        }
        case 'cancel': {
          handleReset();
          break;
        }  
        case 'resend': {
          //console.log("Resend OTP");
          requestOTP({email: formData.email, mobile: formData.mobile, origin});
          break;
        }  
        default:{
          ToastAlert({
            type: 'warning',
            title: 'Your connection is unstable.\nPlease reload page again.',
            onClose: handleReset
          });
          break;
        }
      }
    }

    switch (isValid) {
      case 'none':
        break;
      // Successfully updated
      case 'success': { 
        ToastAlert({
          type: 'success',
          title: 'Data is updated successfully!',
          onClose: refreshPage()
        });
        break;
      }
      // Email need to be verified
      case 'email':{
        //console.log('Need to verify email.');
        SweetOTP({
          title: "Email Verification",
          inputLabel: "To verify the new email address, please enter the otp received on your new email address.",
          onClick: handleOTP,
          timer: timer,
          origin: "email"
        });
        break;
      }
      // Mobile need to be verified
      case 'mobile':{
        //console.log('Need to verify mobile.');
        SweetOTP({
          title: "Mobile Number Verification",
          inputLabel: "To verify the new mobile number, please enter the otp received on your new mobile number.",
          onClick: handleOTP,
          origin: "mobile",
          timer: timer
        });
        break;
      }
      // Email & mobile need to be verified
      case 'emailMobile':{
        //console.log('Need to verify email & mobile.');
        SweetOTP({
          title: "Mobile Number Verification",
          inputLabel: "To verify the new mobile number, please enter the otp received on your new mobile number.",
          onClick: handleOTP,
          timer: timer,
          origin: "emailMobile"
        });
        // If need take an action to verify email
        break;
      }
      // Email or mobile already taken
      case 'invalid':{
        ToastAlert({
          type: 'error',
          title: 'Some infomations are alreday used by another user!\nPlease make sure to add your own information or contact support service.',
          timer: 4000,
          onClose: handleReset
        });
        break;
      }   
      // Default case   
      default:{
        ToastAlert({
          type: 'warning',
          title: 'Your connection is unstable.\nPlease reload page again.',
          onClose: handleReset
        });
        break;
      }
    }
  }, [isValid]);

  const refreshPage = () =>{
    setTimeout(() => {
      //console.log('refresh');
      navigate(0);  
    }, (3001));
  }

  // Handle reset button
  const handleReset = () =>{
    //console.log('Reset Form');
    setFormData(userData);
    setRole(userData.userType);
    setEmpType(userData.empType);
    setMobile(`+${userData.mobile}`);
    setIsClicked(false);
    handleControls();
  }

  // Handling submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log('Form submitted:', formData);
    const newMobile = mobile.split('+')[1].replace(/\s+/g, '');
    //console.log(`newMobile: ${newMobile}`);
    setFormData({...formData, userType:role, empType, mobile:newMobile});
    setIsSubmitted(true);
  };

  // Hnadling form Controlls
  const handleControls = () =>{
    setFormErrors({});
    setIsValid('none');
    setIsSubmitted(false);
  }

  // Handling submit button
  const handleSwitch = (e) => {
    const checked = e.target.checked;
    //console.log(`is Checked:: ${JSON.stringify(checked)}`);
    if(!checked){
      setEmpType('None');
    }
    else{
      setEmpType('Conductor');
      setFormData({...formData, ntc:null, licence:null}); 
    }
    handleControls();
  };

  // Handling userType
  const handleRole = (e) => {
    let type = 'None';
    const newRole = e.target.value;
    let bank = null;
   
    if(newRole === 'passensger') {
      type = 'None';
      bank = null;
    }
    else if(newRole === 'employee'){
      type = (empType === 'None') ? 'Conductor' : empType;
      bank = null;
    }
    else{
      bank = (formData.bank === null) ? "Peoples' Bank" : formData.bank ;
      type = 'None';
    }

    //console.log(`current userType: ${role}    new userType:: ${newRole}\ncurrent empType: ${empType}    new empType: ${type}\ncurrent bank: ${formData.bank}    new bank: ${bank}`);

    setEmpType(type);
    setFormData({...formData, bank:bank});
    setRole(newRole);
    handleControls();
  }

  // Handling form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = (toUpperSet.includes(name)) ? value.toUpperCase() : value;
    setFormData({ ...formData, [name]: newValue });
  };

  // API to request availability of newly updated data
  const chkAvailability = async(values) =>{
    // Creating data object
    const data = {
      type: 'Req6',
      data: values
    }
    
    //console.log(`request message::   type: ${data.type}      data: ${JSON.stringify(data.data)}`);

    try {
      setLoading(true);  // Enabling spinner
      const serverResponse = await Request(data, 'users');
      //console.log(`Server Response:: user availability:${JSON.stringify(serverResponse.data)}`);
      setIsValid(serverResponse.data);
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      setLoading(false);  // Disabling spinner
    }
  }
  
  // API to verify OTP
  const verifyOTP = async(values) =>{
    // Creating data object
    const data = {
      type: 'verify',
      data: values
    }

    // Function to get action
    const action = (value) => {
      //console.log(`Get action. OTP is: ${value}  type(OTP): ${typeof(value)}`);
      switch (value) {
        case 'true':{
          ToastAlert({
            type: 'success',
            title: 'Data is updated successfully!',
            onClose: updateData(formData)
          });
          break;
        }
        case 'false':{
          ToastAlert({
            type: 'error',
            title: 'Invalid OTP!',
            onClose: handleReset
          });
          break;
        }      
        default:{
          ToastAlert({
            type: 'warning',
            title: 'Your connection is unstable.\nPlease reload page again.',
            onClose: handleReset
          });
          break;
        }
      }
    }
    
    //console.log(`request message::   type: ${data.type}      data: ${JSON.stringify(data.data)}`);

    try {
      setLoading(true);  // Enabling spinner
      const serverResponse = await Request(data, 'OTP');
      //console.log(`Server Response:: OTP status:${JSON.stringify(serverResponse.data)}`);
      action(JSON.stringify(serverResponse.data));
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      setLoading(false);  // Disabling spinner
    }
  }
  
  // Function to get the OTP from server
  const requestOTP = async (values) => {
    // Creating data object
    const data = {
      type: 'request',
      data: values
    }
    console.log(`request message::   type: ${data.type}      data: ${JSON.stringify(data.data)}`);

    try {
        setLoading(true);  // Enabling spinner
        const serverResponse = await Request(data, 'OTP');
        setLoading(false);  // Disabling spinner

        // Need to handle if needed
        if( serverResponse.data === 'success') {
          console.log('otp send!');
        } else {
          console.log('error in sending otp!');
        }

    } catch (error) {
        console.error('Error adding user:', error);
    }
  };

  // Function to get the OTP from server
  const updateData = async (values) => {
    // Creating data object
    const data = {
      type: 'Req7',
      data: values
    }
    //console.log(`request message::   type: ${data.type}      data: ${JSON.stringify(data.data)}`);

    try {
        setLoading(true);  // Enabling spinner
        const serverResponse = await Request(data, 'users');
        //console.log(`ServerResposne: ${JSON.stringify(serverResponse.data)}`);
        setLoading(false);  // Disabling spinner
        if (serverResponse.data === 'success') {
          refreshPage();
        }
        else{
          ToastAlert({
            type: 'warning',
            title: 'Your connection is unstable.\nPlease reload page again.',
            onClose: refreshPage
          });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        ToastAlert({
          type: 'warning',
          title: 'Your connection is unstable.\nPlease reload page again.',
          onClose: handleReset
        });
    }
  };

  return (
    Object.keys(formData).length > 0 ? (
      <Paper sx={{
        bgcolor:'rgb(248, 248, 255, 0.8)',
        height: 'calc(100% - 50px)',
        width: 'calc(100% - 50px)',
        minHeight: '400px',
        maxHeight: '76vh',
        overflow: 'hidden',
        padding: '20px',
        paddingBottom: '0',
        borderRadius: '15px'
      }}>
        <Row className='settingsPage'>
          <Col xs={12} md={7} lg={8} xl={8} xxl={8} className='information'>
            <Typography variant='h5' fontFamily='Open Sans' fontWeight='bold' fontSize='28px'>
              General
            </Typography>

            <form>
              <Typography fontFamily='Open Sans' fontWeight='bold' fontSize='20px'>Personal Infomation</Typography>
              <Container>
                <Row >
                  <Col xs={12} xl={6} className='textField'>
                    <TextField
                      required
                      label="First Name"
                      name="fName"
                      error={!!formErrors.fName}
                      helperText={formErrors.fName}
                      value={formData.fName}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      type='text'
                      inputProps={{
                        maxLength:20
                      }}
                    />
                  </Col>

                  <Col xs={12} xl={6} className='textField'>
                    <TextField
                      required
                      label="Last Name"
                      name="lName"
                      error={!!formErrors.lName}
                      helperText={formErrors.lName}
                      value={formData.lName}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      inputProps={{
                        maxLength:20
                      }}
                    />
                  </Col>
                </Row>

                <Row >
                  <Col xs={12} xl={6} className='textField'>
                    <TextField
                      required
                      label="Email"
                      name="email"
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      type="email"
                    />
                  </Col>

                  <Col xs={12} xl={6} className='textField'>
                    <MuiTelInput
                      required
                      name='mobile'
                      onlyCountries={['LK']}
                      error={!!formErrors.mobile}
                      helperText={formErrors.mobile}
                      label='Mobile Number'
                      fullWidth
                      value={(mobile.length > 3) ? mobile : '+94'}
                      onChange={setMobile}
                      inputProps={{
                        maxLength: 15     
                      }}
                    />
                  </Col>
                </Row>
              </Container>

              {role === 'passenger' ? (<></>) : (
                <>
                  <Container>
                    <Row >
                      <Col xs={12} xl={6} className='textField'>                     
                        <TextField
                          label="NIC Number"
                          name="nic"
                          required={(role !== 'Passenger')}
                          error={!!formErrors.nic}
                          helperText={formErrors.nic}
                          value={formData.nic || ''}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          inputProps={{
                            maxLength:12                          
                          }}
                        />
                      </Col>

                      <Col xs={12} xl={6} className='textField'>
                        <TextField
                          label="Birthday"
                          name="birthDay"
                          required={role !== 'Passenger'}
                          error={!!formErrors.nic}
                          helperText={formErrors.nic}
                          value={formData.birthDay || ''}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ 
                            min: "1900-01-01",
                            max: "2200-12-31",
                          }}
                        />
                      </Col>
                    </Row>
                  </Container>
                  <hr/>

                {// Is User not an employee ?
                  empType === 'None' ? (<></>) : (
                    <>
                      <Typography mt='20px' fontFamily='Open Sans' fontWeight='bold' fontSize='20px'>Work Infomation</Typography>
                      <Container>
                        <Row >
                          <Col xs={12} xl={6} className='textField'>
                            <TextField
                              label="NTC Registration No."
                              name="ntc"
                              required={(empType !== 'none')}
                              error={!!formErrors.ntc}
                              helperText={formErrors.ntc}
                              value={formData.ntc || ''}
                              onChange={handleChange}
                              variant="outlined"
                              fullWidth
                              inputProps={{
                                maxLength:10                          
                              }}
                            />
                          </Col>

                          <Col xs={12} xl={6} className='textField'>
                            <FormControl fullWidth required={(empType !== 'none')}>
                              <InputLabel >Work As</InputLabel>
                              <Select
                                name='empType'
                                label='Work As'
                                value={empType}
                                onChange={(e)=>{setEmpType(e.target.value)}}
                              >
                                <MenuItem value="Conductor">Conductor</MenuItem>
                                <MenuItem value="Driver">Driver</MenuItem>
                                <MenuItem value="Both">Both</MenuItem>
                              </Select>
                            </FormControl>
                          </Col>
                        </Row>

                        <Row >
                          <Col xs={12} xl={6} className='textField'>
                            <TextField
                              label="Driving Licence Number"
                              name="licence"
                              required={(empType === 'driver' || empType === 'both')}
                              error={!!formErrors.licence}
                              helperText={formErrors.licence}
                              value={formData.licence || ''}
                              onChange={handleChange}
                              variant="outlined"
                              fullWidth
                              inputProps={{
                                maxLength:8
                              }}
                            />
                          </Col>
                        </Row>
                      </Container>
                      <hr/>
                    </>
                  )
                }

                { role === 'owner' ? (
                  <>
                    <Typography mt='20px' fontFamily='Open Sans' fontWeight='bold' fontSize='20px'>Bank Infomation</Typography>
                    <Container>
                      <Row >
                        <Col xs={12} xl={6} className='textField'>
                          <TextField
                            label="Beneficiary's Name"
                            name="accName"
                            required={(role === 'owner')}
                            value={formData.accName || ''}
                            error={!!formErrors.accName}
                            helperText={formErrors.accName}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            inputProps={{
                              maxLength:30
                            }}
                          />
                        </Col>

                        <Col xs={12} xl={6} className='textField'>
                          <TextField
                            label="Account Number"
                            name="accNo"
                            required={(role === 'owner')}
                            value={formData.accNo || ''}
                            error={!!formErrors.accNo}
                            helperText={formErrors.accNo}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            inputProps={{
                              maxLength:25
                            }}
                          />
                        </Col>                        
                      </Row>

                      <Row >
                        <Col xs={12} xl={6} className='textField'>
                          <FormControl fullWidth required={(role === 'owner')}>
                            <InputLabel >Bank</InputLabel>
                            <Select
                              name='bank'
                              label="Bank"
                              value={formData.bank}
                              onChange={handleChange}
                            >
                              <MenuItem value="Peoples' Bank">Peoples' Bank</MenuItem>
                              <MenuItem value="Bank of Ceylon">Bank of Ceylon</MenuItem>
                              <MenuItem value="Sampath Bank">Sampath Bank</MenuItem>
                              <MenuItem value="Commercial Bank PLC">Commercial Bank PLC</MenuItem>
                              <MenuItem value="Seylan Bank PLC">Seylan Bank PLC</MenuItem>
                              <MenuItem value="HNB - Hatton National Bank">HNB - Hatton National Bank</MenuItem>
                              <MenuItem value="NTB - Nations Trust Bank">NTB - Nations Trust Bank</MenuItem>
                              <MenuItem value="NDB - National Development Bank">NDB - National Development Bank</MenuItem>
                              <MenuItem value="NSB - National Saving Bank">NSB - National Saving Bank</MenuItem>
                            </Select>
                          </FormControl>
                        </Col>

                        <Col xs={12} xl={6} className='textField'>
                          <TextField
                            label="Branch"
                            name="branch"
                            required={(role === 'owner')}
                            value={formData.branch || ''}
                            error={!!formErrors.branch}
                            helperText={formErrors.branch}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            inputProps={{
                            maxLength:25
                            }}
                          />
                        </Col>                        
                      </Row>                      
                    </Container>
                    <hr/>
                  </>
                ) : (<></>)}
                </>
                ) }
            </form>
          </Col>   

          <Col xs={12} md={5} lg={4} xl={3} xxl={3} className='userType'>
            <Box sx={{display:'flex', flexDirection:'column', gap:'20px'}}>
              <Typography variant='h5' fontFamily='Open Sans' fontWeight='bold' fontSize='28px'>
                Account
              </Typography>

              <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', border:'solid 3px black', borderRadius:'10px', padding:'5px'}}>
                <Typography fontFamily='Open Sans' fontWeight='bold' fontSize='16px'> You loged as a </Typography>
                <Typography variant='h6' fontFamily='Open Sans' fontWeight='bold' fontSize='28px'> {formData.userType.toUpperCase()} </Typography>
              </Box>

              {isClicked ? 
                <Box sx={{width: '100%', height:'auto', display:'flex', flexDirection:'column', justifyContent: 'center'}}>
                  <RadioInput 
                    values={userTypes} 
                    value={role} 
                    onChange={handleRole} 
                  />
                  {role === 'owner' ? (
                    <AndroidSwitch leftLabel="Work as an employee" checked={empType!=='None'} onChange={handleSwitch}/>
                  ) : (<></>)}
                </Box>
              : <></> }
              <Button 
                sx={{
                  marginBottom: '20px', 
                  color:'rgb(0,0,0,0.6)', 
                  border:'1.5px solid rgb(0,0,0,0.6)',
                  outlineColor:'black',
                  ":hover":{
                    color:'rgb(0,0,0)', 
                    border:'1.5px solid rgb(0,0,0)',
                    bgcolor: 'rgb(0,0,0,0.1)'
                  }
                }} 
                variant="outlined"
                onClick={()=>{setIsClicked(!isClicked)}}
              >{!isClicked? 'Change' : 'Ok'}</Button>            
            </Box>         

            <Box sx={{
              display:'flex', 
              justifyContent:'space-between',
              margin: '20px 0'
            }}>            
              <Button 
                variant="outlined" 
                sx={{
                  width:'80px',
                  color:'#1a1a1a', 
                  borderColor:'#1a1a1a',
                  outlineColor:'black',
                  ":hover":{
                    color:'black', 
                    borderColor:'black',
                    bgcolor: 'rgb(0,0,0,0.1)'
                  }
                }}  
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button 
                variant="contained" 
                sx={{
                  width:'80px',
                  color:'#ffffff', 
                  bgcolor:'#1a1a1a', 
                  ":hover":{
                    bgcolor:'#404040', 
                  }
                }}   
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Box>

          </Col>
        </Row>
      </Paper>
    ) : (<></>)
  )
}

export default Settings;