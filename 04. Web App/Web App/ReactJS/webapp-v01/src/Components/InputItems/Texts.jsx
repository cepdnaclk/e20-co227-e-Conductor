import { Box, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

export const StyledTextField = ({
  id,
  label,
  placeholder,
  type = "text",
  readOnly = false,
  value,
  onChange,
  helperText,
  inputProps,
  error = false
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
          id={id}
          fullWidth
          error={error}
          placeholder={placeholder}
          type={type}
          value={value}
          helperText={helperText}
          onChange={onChange}
          InputProps={{
            readOnly: readOnly,
            style: { color: 'black' },
            ...inputProps, // Spread inputProps here
          }}
          InputLabelProps={{ shrink: true }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: error ? 'red' : 'black' },
              '&:hover fieldset': { borderColor: error ? 'red' : 'black' },
              '&.Mui-focused fieldset': { borderColor: error ? 'red' : 'black' },
              color: 'black',
            },
          }}
          inputProps={inputProps}
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
    fontColor='black',
    whiteSpace='noWrap',
    ...props
}) {
  return (
    <Typography 
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontStyle={fontStyle}
        variant={variant}
        fontWeight={fontWeight}
        color={fontColor}
        whiteSpace={whiteSpace}
        {...props}
    >
        {children}
    </Typography>
  );
}
