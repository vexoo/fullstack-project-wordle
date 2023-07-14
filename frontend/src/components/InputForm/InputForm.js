import { TextField } from '@mui/material'
import { Field, ErrorMessage } from 'formik'

const InputForm = ({ usernameRef }) => {
  return (
    <>
      <div>
        <div className='error'>
          <ErrorMessage name='username' component='div' className='text-red-500' />
        </div>
        <Field
          type='text'
          name='username'
          label='username'
          as={TextField}
          variant='filled'
          className='bg-white'
          inputRef={usernameRef}
        />
      </div>
      <div>
        <Field
          type='password'
          name='password'
          label='password'
          as={TextField}
          variant='filled'
          className='bg-white'
        />
        <div className='error'>
          <ErrorMessage name='password' component='div' className='text-red-500' />
        </div>
      </div>
    </>
  )
}

export default InputForm
