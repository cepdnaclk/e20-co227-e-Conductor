import React from 'react';
import { Box, IconButton, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const ProfileImageContainer = styled(Box)({
  position: 'relative',
  display: 'inline-block',
});

const ProfileImage = styled(Avatar)({
  width: '150px',
  height: '150px',
});

const OverlayButton = styled(Box)({
  position: 'absolute',
  bottom: '0',
  right: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  borderRadius: '50%',
  padding: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

function AvatarButton( {image} ) {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the file change logic here
      console.log('Selected file:', file);
      // API to upload image to a server
    }
  };

  return (
    <ProfileImageContainer>
      <ProfileImage alt="Profile Image" src={image} />
      <OverlayButton>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="icon-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <AddAPhotoIcon sx={{color: 'white'}}/>
          </IconButton>
        </label>
      </OverlayButton>
    </ProfileImageContainer>
  );
};

export default AvatarButton;
