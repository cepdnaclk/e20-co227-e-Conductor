import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ open, handleClose, handleConfirm, message, title, extraItems }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
          {extraItems}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Back
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
