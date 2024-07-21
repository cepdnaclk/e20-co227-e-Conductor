import { Box, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

export const StyledTextField = ({
  label,
  placeholder,
  type = "text",
  readOnly = false,
  value,
  onChange,
  inputProps,
}) => (
  <Box sx={{ display: 'flex', alignItems: 'baseline', width: '100%' }}>
    <Grid container alignItems="baseline">
      {label && (
        <Grid item xs={12}>
          <Typography sx={{ color: 'black', fontFamily: 'Open Sans', fontWeight: 'bold' }}>
            {label}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <TextField
          fullWidth
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          InputProps={{
            readOnly: readOnly,
            style: { color: 'black' },
            ...inputProps, // Spread inputProps here
          }}
          InputLabelProps={{ shrink: true }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'black' },
              '&:hover fieldset': { borderColor: 'black' },
              '&.Mui-focused fieldset': { borderColor: 'black' },
              color: 'black',
            },
          }}
        />
      </Grid>
    </Grid>
  </Box>
);

export default function Texts({
    children, 
    fontSize, 
    fontFamily='Open Sans',
    fontStyle='normal',
    variant, 
    fontWeight='bold',
    fontColor='black'
}) {
  return (
    <Typography 
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontStyle={fontStyle}
        variant={variant}
        fontWeight={fontWeight}
        color={fontColor}
    >
        {children}
    </Typography>
  );
}
