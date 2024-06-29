import React, { useState } from 'react';
import { Grid, Container, TextField, Button, Box, Typography, Paper, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { MuiTelInput } from 'mui-tel-input';

const userData = {
  userId    : 'userID',
  role      : 'passenger',
  fName     : 'John',
  lName     : 'Doe',
  email     : 'johndoe@gmail.com',
  mobile    : '+94 70-1345678',
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

function UserForm() {
  const [formData, setFormData] = useState(userData);

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
      bgcolor:'rgba(248, 248, 255, 0.8)',
      maxHeight:'76vh',
      overflow: 'hidden',
      padding: '20px 30px 30px 30px',
      borderRadius: '15px'
    }}>
      <Container style={{margin:0, padding:0, maxWidth:"sm"}}>
        <Box sx={{padding:'0', margin:0, maxHeight:'60vh', overflow: 'auto',}} >
          <Typography variant="h4" gutterBottom sx={{fontFamily:'Open Sans', textAlign:'center', textJustify:'center', bgc:'red', fontWeight:'bold', mb:'20px'}}>
            Update Information
          </Typography>
        </Box>
        <Box sx={{padding:'10px 0', margin:0, maxHeight:'60vh', overflow: 'auto',}} >
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                required
                label="First Name"
                name="fName"
                value={formData.fName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                required
                label="Last Name"
                name="lName"
                value={formData.lName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                required
                label="Email"
                name="email"
                //error={handleEror} // Error Handling Here
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                type="email"
              />

              <MuiTelInput
                required
                name='mobile'
                onlyCountries={['LK']}
                //error={errror}
                label='Mobile Number'
                fullWidth
                value={formData.mobile}
                //onChange={handleNumber}
                inputProps={{
                  maxLength: 15          
                }}
              />
              <TextField
                label="NIC"
                name="nic"
                //required={}
                //error={handleEror} // Error Handling Here
                value={formData.nic}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Birthday"
                name="birthDay"
                //required={}
                //error={}
                value={formData.birthDay}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="NTC"
                name="ntc"
                //required={}
                value={formData.ntc}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Licence"
                name="licence"
                //required={}
                value={formData.licence}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Account Name"
                name="accName"
                //required={}
                value={formData.accName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Account Number"
                name="accNo"
                //required={}
                value={formData.accNo}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Bank</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //value={formData.bank}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value="People's Bank">People's Bank</MenuItem>
                  <MenuItem value="BOC">BOC</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Branch"
                name="branch"
                //required={}
                value={formData.branch}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                type='select'
              />
              
              {/* For file inputs, you might want to use different handling */}

              <Grid sx={{display:'flex', justifyContent:'space-around'}}>
                <Button variant="outlined" color="primary" type="submit">
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Box>
          </form>
        </Box>
      </Container>
    </Paper>
  );
}

export default UserForm;
