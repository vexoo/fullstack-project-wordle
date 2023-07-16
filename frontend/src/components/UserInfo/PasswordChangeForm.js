import { useDispatch } from 'react-redux'
import Button from '../Button'
import { changePassword } from '../../reducers/userReducer'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import PasswordField from '../InputForm/PasswordField'

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
                <PasswordField
                  name='currentPassword'
                  label='Current password'
                  id='current-pass-form'
                />
                <PasswordField
                  name='newPassword'
                  label='New password'
                  id='new-pass-form'
                />
                <PasswordField
                  name='confirmNewPassword'
                  label='Confirm new password'
                  id='confirm-new-pass-form'
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
