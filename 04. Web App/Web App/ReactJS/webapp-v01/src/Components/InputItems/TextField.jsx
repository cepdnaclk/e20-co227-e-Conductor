import React from 'react'

function TextField({value, onChange}) {
  return (
    <div>
      <TextField
        required
        label="Last Name"
        name="lName"
        value={value}
        onChange={onChange}
        variant="outlined"
        fullWidth
      />
    </div>
  )
}

export default TextField
