import { Button } from '@mui/material'
import React from 'react'
import DialogBox from '../Card/DialogBox';

function ImageButton({image, width, height, onClick}) {
  return (
    <div>
      <Button 
        sx={{
          backgroundImage: `url(${image})`,
          width: width,
          height: height,
          backgroundSize: 'cover',
          ":hover":{
              opacity: '80%'
          }
        }}
        onClick={onClick}

      >
        <DialogBox ></DialogBox>
      </Button>
    </div>
  )
}

export default ImageButton
