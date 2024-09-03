import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function SingleInputDialog({open, handleClose, handleContinue, title, message}) {
  // Variable to hold the vehical number
  const [value, setValue] = useState('');

  // Variable to hold the state of the checkbox
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    //console.log('New bus: ', event.target.value);
    setValue(event.target.value);
  };

  const handleContinueAction = (event) => {
    event.preventDefault();
    handleContinue(value);
  };

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
          <DialogContentText>{message}</DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            label='New Vehicle Number'
            variant="standard"
            placeholder='NA-0000'
            value={value}
            onChange={handleChange}
            fullWidth
            inputProps={{ maxLength: 7 }}
          />
          <FormControlLabel control={<Checkbox checked={checked} onChange={()=>setChecked(!checked)} />} label={<>I am accepting all <Link to={'/terms'}>Terms & Conditions</Link></>}></FormControlLabel>
        </DialogContent>
        
        <DialogActions>
          <Button sx={{fontFamily:'Open Sans', fontWeight:'bold'}} onClick={handleClose}>Cancel</Button>
          <Button sx={{fontFamily:'Open Sans', fontWeight:'bold'}} type="submit" disabled={!checked}>Continue</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
