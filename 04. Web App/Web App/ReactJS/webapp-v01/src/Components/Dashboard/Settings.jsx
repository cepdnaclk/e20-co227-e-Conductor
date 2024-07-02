import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, FormControl, InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { MuiTelInput } from 'mui-tel-input';
import { Col, Container, Row } from 'react-bootstrap';
import avatar from '../../Images/logo - Bkgrnd.jpg'
import bgImage from '../../Images/waterfall.jpg'
import './Components.css'
import AvatarButton from '../InputItems/AvatarButton';
import ImageButton from '../InputItems/ImageButton';

const userData = {
  userId    : 'userID',
  userType  : 'passenger',
  empType   : 'driver',
  fName     : 'John',
  lName     : 'Doe',
  email     : 'johndoe@gmail.com',
  mobile    : '+94 70134567',
  nic       : '200456789105',
  birthDay  : '2004-05-24',
  ntc       : '',
  licence   : '',
  accName   : '',
  accNo     : '',
  bank      : "Peoples' Bank",
  branch    : '',
  licenceFile: [], 
  passbook: null
};

function Settings() {
  // Variable to store updated data
  const [formData, setFormData] = useState(userData);

  // Variable to check the validity of given data
  const [isValid, setIsValid] = useState(false);

  // Object to store errors
  const [formErrors, setFormErrors] = useState({}); 

  // Variable to store user type
  const [role, setRole] = useState(userData.userType);

  // Variable to store employee type
  const [empType, setEmpType] = useState(userData.empType);

  // Variable to store mobile number
  const [mobile, setMobile] = useState(userData.mobile);

  // Handle reset button
  const hanbleReset = () =>{
    setFormData(userData);
    setMobile(userData.mobile);
    setRole(userData.userType);
    setEmpType(userData.empType);
    setFormErrors({});
  }

  // Handling form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <Paper sx={{
      bgcolor:'rgb(248, 248, 255, 0.7)',
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
        <Col xs={12} md={5} lg={4} xl={3} xxl={2} className='appearance'>
          <Typography variant='h5' fontFamily='Open Sans' fontWeight='bold' fontSize='28px'>
            Appearance
          </Typography>

          <Container>
            <Box>
              <AvatarButton image={avatar}/>
            </Box>
            <Typography fontFamily='Open Sans' fontWeight='bold' fontSize='16px'>
              Profile Picture
            </Typography>
          </Container>

          <Container>           
            <ImageButton image={bgImage} width='180px' height='100px'/>
            
            <Typography fontFamily='Open Sans' fontWeight='bold' fontSize='16px'>
              Background Image
            </Typography>
          </Container>         
        </Col>

        <Col xs={12} md={7} lg={4} xl={6} xxl={8} className='information'>
          <Typography variant='h5' fontFamily='Open Sans' fontWeight='bold' fontSize='28px'>
            General
          </Typography>

          <form onSubmit={handleSubmit}>
            <Typography fontFamily='Open Sans' fontWeight='bold' fontSize='20px'>Personal Infomation</Typography>
            <Container>
              <Row >
                <Col xs={12} xl={6} xxl={6} className='textField'>
                  <TextField
                    required
                    label="First Name"
                    name="fName"
                    error={formErrors.fName}
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

                <Col xs={12} xl={6} xxl={6} className='textField'>
                  <TextField
                    required
                    label="Last Name"
                    name="lName"
                    error={formErrors.lName}
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
                <Col xs={12} xl={6} xxl={6} className='textField'>
                  <TextField
                    required
                    label="Email"
                    name="email"
                    error={formErrors.email}
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    type="email"
                  />
                </Col>

                <Col xs={12} xl={6} xxl={6} className='textField'>
                  <MuiTelInput
                    required
                    name='mobile'
                    onlyCountries={['LK']}
                    error={formErrors.mobile}
                    label='Mobile Number'
                    fullWidth
                    value={mobile}
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
                    <Col xs={12} xl={6} xxl={6} className='textField'>                     
                      <TextField
                        label="NIC Number"
                        name="nic"
                        required={(role !== 'Passenger')}
                        error={formErrors.nic}
                        value={formData.nic}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        inputProps={{
                          maxLength:12                          
                        }}
                      />
                    </Col>

                    <Col xs={12} xl={6} xxl={6} className='textField'>
                      <TextField
                        label="Birthday"
                        name="birthDay"
                        required={(role !== 'Passenger')}
                        error={formErrors.birthDay}
                        value={formData.birthDay}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        type="date"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Col>
                  </Row>
                </Container>
                <hr/>

              {// Is User not an employee ?
                empType === 'none' ? (<></>) : (
                  <>
                    <Typography mt='20px' fontFamily='Open Sans' fontWeight='bold' fontSize='20px'>Work Infomation</Typography>
                    <Container>
                      <Row >
                        <Col xs={12} xl={6} xxl={6} className='textField'>
                          <TextField
                            label="NTC Registration No."
                            name="ntc"
                            required={(empType !== 'none')}
                            error={formErrors.ntc}
                            value={formData.ntc}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            inputProps={{
                              maxLength:10                          
                            }}
                          />
                        </Col>

                        <Col xs={12} xl={6} xxl={6} className='textField'>
                          <FormControl fullWidth required={(empType !== 'none')}>
                            <InputLabel >Work As</InputLabel>
                            <Select
                              name='empType'
                              label='Work As'
                              value={empType}
                              onChange={(e)=>{setEmpType(e.target.value)}}
                            >
                              <MenuItem value="conductor">Conductor</MenuItem>
                              <MenuItem value="driver">Driver</MenuItem>
                              <MenuItem value="both">Both</MenuItem>
                            </Select>
                          </FormControl>
                        </Col>
                      </Row>

                      <Row >
                        <Col xs={12} xl={6} xxl={6} className='textField'>
                          <TextField
                            label="Driving Licence Number"
                            name="licence"
                            required={(empType === 'driver' || empType === 'both')}
                            error={formErrors.licence}
                            value={formData.licence}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            inputProps={{
                              maxLength:8
                            }}
                          />
                        </Col>

                        {/*Need to update*/}
                        <Col xs={12} xl={6} xxl={6} className='textField'>
                          <TextField
                            label="Upload images of both sides of your driving license card"
                            name="licenceFile"
                            required={(empType === 'driver' || empType === 'both')}
                            error={formErrors.licence}
                            value={formData.licence}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            type="file"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{
                              accept:".png, .jpg, .jpeg",
                              multiple:true,
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
                      <Col xs={12} xl={6} xxl={6} className='textField'>
                        <TextField
                          label="Beneficiary's Name"
                          name="accName"
                          required={(role === 'owner')}
                          value={formData.accName}
                          error={formErrors.accName}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          inputProps={{
                            maxLength:30
                          }}
                        />
                      </Col>

                      <Col xs={12} xl={6} xxl={6} className='textField'>
                        <TextField
                          label="Account Number"
                          name="accNo"
                          required={(role === 'owner')}
                          value={formData.accNo}
                          error={formErrors.accNo}
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
                      <Col xs={12} xl={6} xxl={4} className='textField'>
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

                      <Col xs={12} xl={6} xxl={4} className='textField'>
                        <TextField
                          label="Branch"
                          name="branch"
                          required={(role === 'owner')}
                          value={formData.branch}
                          error={formErrors.branch}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          inputProps={{
                          maxLength:25
                          }}
                        />
                      </Col>

                      {/*Need to update*/}
                      <Col xs={12} xxl={4} className='textField'>
                        <TextField
                          label="Upload an image of your bank passbook"
                          name="passbook"
                          required={(role === 'owner')}
                          error={formErrors.passbook}
                          value={formData.passbook}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          type="file"
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            accept:".png, .jpg, .jpeg",
                            multiple:false,
                          }}
                      />
                      </Col>
                    </Row>                      
                  </Container>
                  <hr/>
                </>
              ) : (<></>)}
              </>
              )}
          </form>
        </Col>   

        <Col xs={12} lg={4} xl={3} xxl={2} className='userType'>
          <Box sx={{display:'flex', flexDirection:'column', gap:'20px'}}>
            <Typography variant='h5' fontFamily='Open Sans' fontWeight='bold' fontSize='28px'>
              Account
            </Typography>

            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', border:'solid 3px black', borderRadius:'10px', padding:'5px'}}>
              <Typography fontFamily='Open Sans' fontWeight='bold' fontSize='16px'> You loged as a </Typography>
              <Typography variant='h6' fontFamily='Open Sans' fontWeight='bold' fontSize='28px'> {formData.userType.toUpperCase()} </Typography>
            </Box>

            <Button sx={{marginBottom: '20px'}} variant="outlined">Change Account Type</Button>
          </Box>         

          <Box sx={{
            display:'flex', 
            justifyContent:'space-between',
            margin: '20px 0'
          }}>            
            <Button variant="outlined" sx={{width:'85px'}} onClick={hanbleReset}>Reset</Button>
            <Button variant="contained" sx={{width:'85px'}} type='submit'>Save</Button>
          </Box>

        </Col>
      </Row>
    </Paper>
  );
}

export default Settings;

/*

*/