import { TextField } from '@mui/material'
import { Field } from 'formik'

const InputField = ({ name, label, ...props }) => {
  return (
    <>
      <div>
        <Field
          type='text'
          name={name}
          label={label}
          as={TextField}
          variant='filled'
          className='bg-white'
          {...props}
        />
      </div>
    </>
  )
}

export default InputField
