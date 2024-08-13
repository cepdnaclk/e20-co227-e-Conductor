import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating, TextField } from '@mui/material'
import React, { useState } from 'react'
import Texts from '../InputItems/Texts';

const MAXCHARS = 150;

export default function FeedbackForm({open, handleClose, handleSubmit}) {
  const userID = JSON.parse(localStorage.getItem('userId')) || JSON.parse(localStorage.getItem('userId'));

  const [feedback, setFeedback] = useState({
    userID,
    rating:0,
    note: '',
  });

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(feedback);
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: submit
        }}
      >
        <DialogTitle fontFamily={'Open Sans'} fontWeight={'Bold'} textAlign={'center'}>Customer Review</DialogTitle>
        
        <DialogContent sx={{width:{xs:'100%', md:'500px'}}}>
          <Texts fontWeight='normal'>Click stars to rate the service.</Texts>          
          <Rating
            name="rating"
            value={feedback.rating}
            precision={1}
            sx={{mt:1}}
            onChange={(e, newValue) => setFeedback({ ...feedback, rating: newValue })}
          />

          <Texts whiteSpace='normal' fontWeight='normal' mt={3}>Share your review about our service.</Texts>
          <TextField
            name="note"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={feedback.note}
            onChange={(e) => setFeedback({ ...feedback, note: e.target.value })}
            sx={{mt:1}}
            inputProps={{ maxLength: MAXCHARS }}
          />
          <Texts
            color="textSecondary"
            textAlign="right"
            fontWeight='normal'
            fontSize='12px'
            sx={{ mt: 1 }}
          >
            {`${feedback.note.length}/${MAXCHARS} characters`}
          </Texts>

        </DialogContent>
        
        <DialogActions>
          <Button sx={{fontFamily:'Open Sans', fontWeight:'bold'}} onClick={handleClose}>Cancel</Button>
          <Button sx={{fontFamily:'Open Sans', fontWeight:'bold'}} type="submit" >Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
