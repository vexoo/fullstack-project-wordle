import { TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from '../Button'

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

/*
const InputForm = ({
  onSubmit,
  usernameRef,
  setUsername,
  setPassword,
  buttonText
}) => {
  return (
    <div className='mt-5'>
      <form onSubmit={onSubmit}>
        <div>
          <TextField
            id='username-form'
            className='bg-white'
            label='username'
            variant='filled'
            onChange={({ target }) => setUsername(target.value)}
            inputRef={usernameRef}
          />
        </div>
        <div>
          <TextField
            id='password-form'
            className='bg-white'
            label='password'
            variant='filled'
            type='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className='mt-5'>
          <Button id='inputform-button' text={buttonText} type='submit' />
        </div>
      </form>
    </div>
  )
}
*/

export default InputForm
