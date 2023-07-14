import { useDispatch } from 'react-redux'
import { TextField } from '@mui/material'
import Button from '../Button'
import { changePassword } from '../../reducers/userReducer'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const passwordValidationSchema = Yup.object({
  currentPassword: Yup.string().required(),
  newPassword: Yup.string()
    .required('')
    .min(5, 'New password must be at least 5 characters'),
  confirmNewPassword: Yup.string()
    .required('')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
})

const PasswordChangeForm = ({ isEditingPassword, setIsEditingPassword }) => {
  const dispatch = useDispatch()

  const handlePasswordUpdate = (values, { resetForm }) => {
    const { currentPassword, newPassword } = values
    dispatch(changePassword(currentPassword, newPassword))
    resetForm()
    setIsEditingPassword(false)
  }

  return (
    <div className='mt-2 flex flex-col divide-y'>
      {isEditingPassword ? (
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
          }}
          onSubmit={handlePasswordUpdate}
          validationSchema={passwordValidationSchema}
        >
          {({ isValid }) => (
            <Form className='flex'>
              <div className='flex flex-col items-start'>
                <Field
                  type='password'
                  name='currentPassword'
                  id='current-pass-form'
                  as={TextField}
                  label='Current password'
                  variant='filled'
                  className='bg-white'
                />
                <Field
                  type='password'
                  name='newPassword'
                  id='new-pass-form'
                  as={TextField}
                  label='New password'
                  variant='filled'
                  className='bg-white'
                />
                <Field
                  type='password'
                  name='confirmNewPassword'
                  id='confirm-new-pass-form'
                  as={TextField}
                  label={'Confirm new password'}
                  variant='filled'
                  className='bg-white'
                />
                <ErrorMessage
                  name='newPassword'
                  component='div'
                  className='text-red-500'
                />
                <ErrorMessage
                  name='confirmNewPassword'
                  component='div'
                  className='text-red-500'
                />
                <Button
                  id='save-newpassword-button'
                  className={`mt-2 px-4 py-2 ${!isValid ? 'opacity-50' : ''}`}
                  type='submit'
                  text={'save'}
                />
              </div>
            </Form>
          )}
        </Formik>
      ) : null}
    </div>
  )
}

export default PasswordChangeForm
