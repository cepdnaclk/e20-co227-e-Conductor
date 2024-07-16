import { Button } from '@mui/material'
import React, { useRef } from 'react'

function ImageButton({image, width, height, onFileChange, icon}) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

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
        onClick={handleClick}
      >
        {icon}
      </Button>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        accept={['.jpg', '.png', '.jpeg']}
        onChange={onFileChange}
      />
    </div>
  )
}

export default ImageButton
