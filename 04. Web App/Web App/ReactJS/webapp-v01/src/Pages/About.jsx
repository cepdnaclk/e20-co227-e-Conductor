import React, { useState } from 'react'
import './Home.css'
import TempMap from '../Components/Map/TempMap'
import AlertDialog from '../Components/DialogBox/AlertDialog'
import { Button } from '@mui/material';
import DraggableDialog from '../Components/DialogBox/DragableDialog';

export default function Home({ language }) {
const [open, setOpen] = useState(false);

// Handling dialog box
const handleClose = () => {
  setOpen(false);
};

const handleConfirm = () => {
  setOpen(false);
};


  return (
    <div >
      <h1>About</h1>
      <h3>Language: {language} </h3>
      {/* <TempMap/> */}
      <button onClick={()=>{setOpen(true)}}>clickMe</button>
      <DraggableDialog
        open={open} 
        handleClose={handleClose} 
        handleConfirm={handleConfirm}
        title={'Delete Bus'} 
        message={'Are you sure you want to permenently delete this?'}
      />
    </div>
  )
}
