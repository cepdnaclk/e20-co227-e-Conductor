/*import React from 'react'

function Messages() {
  return (
    <div>
      404 Forbidden
    </div>
  )
}

export default Messages*/

import React, { useState } from 'react'
import { MuiTelInput } from 'mui-tel-input'
import { Paper } from '@mui/material'


export default function Messages() {
  const [number, setNUmber] = useState('+94');
  const [errror, setError] = useState(false);

  const handleNumber = (e) => {
    setNUmber(e);
    setError(e.length>15 ? true  : false);
  }

  return (
    <Paper sx={{padding:2}}>
      <MuiTelInput
        required
        onlyCountries={['LK']}
        error={errror}
        label='Mobile Number'
        value={number}
        onChange={handleNumber}
        inputProps={{
          maxLength: 15          
        }}
      />
    </Paper>
  )
}
