import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, Divider, FormControlLabel, Grid, MenuItem, TextField } from '@mui/material';
import { useEffect } from 'react';
import Texts from '../InputItems/Texts';

export default function FormDialog({open, handleClose, handleContinue, title, data}) {
  const [formData, setFormData] = React.useState(data);

  const [checked, setChecked] = React.useState(false);

  const[VRL_error, setVRL_error] = React.useState(false);
  const[InsError, setInsError] = React.useState(false);

  const handleChange = (event) => {
    const {name, value} = event.target;
    //console.log('name: ', name, "value: ", value);
    setFormData({...formData, [name]:value});
  };

  const handleContinueAction = (event) => {
    event.preventDefault();
    handleContinue(formData);
  };

  useEffect(()=>{
    setFormData(data);
  },[data]);

  useEffect(()=>{
    const handleError = (date) => {
      const today = new Date().toISOString();
      try {
        const tempDate = new Date(date).toISOString();
        return today > tempDate;
      } catch (error) {
        return false;
      }
    }

    setInsError(handleError(formData.insuranceExp));
    setVRL_error(handleError(formData.VRL_Exp));
  },[formData]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleContinueAction
        }}
      >
        <DialogTitle fontFamily={'Open Sans'} fontWeight={'Bold'}>{title}</DialogTitle>
        
        <DialogContent>
          <Texts>General Information</Texts>
          <Grid container spacing={2} mt={'0px'}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label='Vehicle Number'
                value={formData.regNo || ''}
                onChange={handleChange}
                name='regNo'
                fullWidth
                inputProps={{ maxLength: 7 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label='NTC Number'
                value={formData.ntc || ''}
                onChange={handleChange}
                name='ntc'
                inputProps={{ maxLength: 7 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                id="outlined-required"
                label='Service Type'
                value={formData.service || ''}
                onChange={handleChange}
                name='service'
              >
                <MenuItem value={'Normal'}>Normal</MenuItem>
                <MenuItem value={'Semi-Luxury'}>Semi-Luxury</MenuItem>
                <MenuItem value={'Luxury'}>Luxury</MenuItem>
                <MenuItem value={'Super-Luxury'}>Super-Luxury</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label='Number of Seats'
                value={formData.seats || ''}
                onChange={handleChange}
                name='seats'
              >
                <MenuItem value={'33'}>33</MenuItem>
                <MenuItem value={'42'}>42</MenuItem>
                <MenuItem value={'54'}>54</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label='Organization Catagory'
                value={formData.org || ''}
                onChange={handleChange}
                name='org'
              >
                <MenuItem value={'SLTB'}>SLTB</MenuItem>
                <MenuItem value={'Private'}>Private</MenuItem>
              </TextField>
            </Grid>
          </Grid>          
          <Divider sx={{mb:'20px'}}/>

          <Texts>Insurance Details</Texts>
          <Grid container spacing={2} mt={'0px'}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label='Insurance Card Number'
                value={formData.insuranceId || ''}
                onChange={handleChange}
                name='insuranceId'
                inputProps={{ maxLength: 15 }}
                error={InsError}
                helperText={InsError ? 'The insurance card has already expired.' : null}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type='date'
                label='Expired Date'
                value={formData.insuranceExp || ''}
                onChange={handleChange}
                name='insuranceExp'
                InputLabelProps={{shrink:true}}
                inputProps={{
                  max: '2100-12-31',
                  min: '2024-01-01'
                }}
                error={InsError}
              />
            </Grid>
          </Grid>          
          <Divider sx={{mb:'20px'}}/>

          <Texts>Vehical Revenue Licence (VRL) Details</Texts>
          <Grid container spacing={2} mt={'0px'}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label='VRL Number'
                value={formData.VRL_Id || ''}
                onChange={handleChange}
                name='VRL_Id'
                inputProps={{ maxLength: 10 }}
                error={VRL_error}
                helperText={VRL_error ? 'The VRL has already expired.' : null}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type='date'
                label='Expired Date'
                value={formData.VRL_Exp || ''}
                onChange={handleChange}
                name='VRL_Exp'
                InputLabelProps={{shrink:true}}
                inputProps={{
                  max: '2100-12-31',
                  min: '2024-01-01'
                }}
                error={VRL_error}
              />
            </Grid>
          </Grid>          
          <Divider sx={{mb:'30px'}}/>

          <FormControlLabel control={<Checkbox checked={checked} onChange={()=>setChecked(!checked)} />} label="I confirm that all the data provided is true information." />
        </DialogContent>
        
        <DialogActions>
          <Button sx={{fontFamily:'Open Sans', fontWeight:'bold'}} onClick={handleClose}>Cancel</Button>
          <Button sx={{fontFamily:'Open Sans', fontWeight:'bold'}} type="submit" disabled={!checked}>Continue</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
