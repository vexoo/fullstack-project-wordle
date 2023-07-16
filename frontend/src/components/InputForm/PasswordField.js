import { useState } from 'react'
import { TextField, IconButton, InputAdornment } from '@mui/material'
import { Field } from 'formik'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const PasswordField = ({ name, label, size, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const width = size ? size : '100%'

  return (
    <>
      <Field
        type={showPassword ? 'text' : 'password'}
        name={name}
        label={label}
        as={TextField}
        variant='filled'
        className='bg-white'
        sx={{ width: width }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleTogglePassword} edge='end'>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          )
        }}
        {...props}
      />
    </>
  )
}

export default PasswordField
