import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react'

export default function ThreeButtonDialog({ open, handleResponse, message, title, left='Back', middle='Reject', right='Accept' }) {
    return (
        <React.Fragment>
          <Dialog
            open={open}
            onClose={()=>handleResponse('close')}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {title}
            </DialogTitle>
    
            <DialogContent>
              <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
            </DialogContent>
    
            <DialogActions>
              <Button onClick={()=>handleResponse('close')} color="primary">
                {left}
              </Button>
              <Button onClick={()=>handleResponse(middle)} color="error">
                {middle}
              </Button>
              <Button onClick={()=>handleResponse(right)} color="success" autoFocus>
                {right}
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
}
