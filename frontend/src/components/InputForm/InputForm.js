import { ErrorMessage } from 'formik'
import PasswordField from './PasswordField'
import InputField from './InputField'

const InputForm = ({ usernameRef }) => {
  return (
    <>
      <div>
        <div className='error'>
          <ErrorMessage name='username' component='div' className='text-red-500' />
        </div>
        <InputField name='username' label='username' inputRef={usernameRef} />
      </div>
      <div>
        <PasswordField name='password' label='password' size='67%' />
        <div className='error'>
          <ErrorMessage name='password' component='div' className='text-red-500' />
        </div>
      </div>
    </>
  )
}

export default InputForm
