import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { OnceFadeIn } from '../Components/Animations/Entrance.Once';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <OnceFadeIn >
      <Box
        width="100%"
        height="calc(100vh - 140px)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          textAlign: 'center',
          backgroundColor: 'ghostwhite',
          padding: '20px',
          '@media (max-width: 600px)': {
            padding: '10px',
          },
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '40px' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{
            padding: '10px 20px',
            fontSize: '16px',
            textTransform: 'none',
          }}
        >
          Go to Homepage
        </Button>
      </Box>
    </OnceFadeIn>
  );
}
