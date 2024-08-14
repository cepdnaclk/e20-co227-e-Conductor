import React from 'react';
import { Box, Button } from '@mui/material';
import { CheckCircleOutline as CheckCircleOutlineIcon } from '@mui/icons-material';
import Texts from '../Components/InputItems/Texts';

export default function VerifyEmailPage() {
  const handleGoToDashboard = () => {
    // Redirect to the dashboard or homepage after successful verification
    window.location.href = '/signin';
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 100px)"
      textAlign="center"
      px={2}
      bgcolor={'ghostwhite'}
    >
      <CheckCircleOutlineIcon sx={{ fontSize: 100, color: '#4caf50', mb: 2 }} />
      <Texts variant="h4" fontWeight="bold" mb={2}>
        Email Verified Successfully!
      </Texts>
      <Texts variant="body1" mb={4}>
        Thank you for verifying your email. You can now login to the platform and start using our services.
      </Texts>
      <Button
        variant="contained"
        color="primary"
        sx={{ fontFamily: 'Open Sans', fontWeight: 'bold' }}
        onClick={handleGoToDashboard}
      >
        Login
      </Button>
    </Box>
  );
}
