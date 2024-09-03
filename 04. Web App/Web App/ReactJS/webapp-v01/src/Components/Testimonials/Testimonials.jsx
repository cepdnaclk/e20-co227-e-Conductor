import * as React from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { IconButton } from '@mui/material';
import { Tooltip } from '@mui/joy';

export default function DotsMobileStepper({activeStep, setActiveStep}) {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      variant="dots"
      steps={6}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1, bgcolor:'ghostwhite'}}
      nextButton={
        <Tooltip title={'Next'}>
          <IconButton size="small" onClick={handleNext} disabled={activeStep === 5}>
            <KeyboardArrowRight />
          </IconButton>
        </Tooltip>
      }
      backButton={
        <Tooltip title={'Back'}>
          <IconButton size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
          </IconButton>
        </Tooltip>
      }
    />
  );
}