import React from 'react';
import { ReactComponent as SeatIcon } from '../Resources/Seat3.svg'; // Adjust the path to where your SVG file is located
import { Box } from '@mui/material';

const CustomIcon = ({ color = 'black', width = 64, height = 64 }) => {
  return (
    <Box sx={{ bgcolor: color, width: (width-5), height: height, borderRadius:'25px' }} >
        <SeatIcon style={{ width: width, height: height }} />
    </Box>
  );
};

export default CustomIcon;
