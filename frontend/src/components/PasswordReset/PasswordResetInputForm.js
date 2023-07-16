import { useDispatch } from 'react-redux'
import userService from '../../services/user'
import { setToken } from '../../util/config'
import { onClose, setLoginModalOpen } from '../../reducers/modalReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { changePasswordButtonText } from '../../util/strings'
import { Formik, Form, ErrorMessage } from 'formik'
import Button from '../Button'
import * as Yup from 'yup'
import PasswordField from '../InputForm/PasswordField'

const passwordValidationSchema = Yup.object({
  newPassword: Yup.string()
    .required('')
    .min(5, 'New password must be at least 5 characters'),
  confirmNewPassword: Yup.string()
    .required('')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
})

const PasswordResetInputForm = ({ foundUser }) => {
  const dispatch = useDispatch()

  const onSubmit = async (values, { resetForm }) => {
    try {
      const { newPassword } = values
      const response = await userService.updatePassword(foundUser, newPassword)
      if (response) {
        setToken(null)
        dispatch(setNotification(response.message, 3))
        dispatch(onClose())
        dispatch(setLoginModalOpen())
        resetForm()
      }
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 3, true))
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          newPassword: '',
          confirmNewPassword: ''
        }}
        onSubmit={onSubmit}
        validationSchema={passwordValidationSchema}
      >
        <Form>
          <PasswordField name='newPassword' label='Enter new password' size='70%' />
          <PasswordField
            name='confirmNewPassword'
            label='Confirm new password'
            size='70%'
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
          <div className='mt-5'>
            <Button text={changePasswordButtonText} type='submit' />
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default PasswordResetInputForm
