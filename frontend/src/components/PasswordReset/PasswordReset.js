import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import loginService from '../../services/login'
import userService from '../../services/user'
import securityQuestionService from '../../services/securityQuestion'
import InputForm from '../InputForm'
import { setToken } from '../../util/config'
import { setLocalLoggedUser } from '../../util/localStorageHelper'
import { setUser } from '../../reducers/userReducer'
import { onClose, setLoginModalOpen } from '../../reducers/modalReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { signUpButtonText, signupNotification } from '../../util/strings'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from '../Button'
import * as Yup from 'yup'
import { TextField } from '@mui/material'

const passwordValidationSchema = Yup.object({
  newPassword: Yup.string()
    .required('')
    .min(5, 'New password must be at least 5 characters'),
  confirmNewPassword: Yup.string()
    .required('')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
})

const PasswordReset = () => {
  const dispatch = useDispatch()
  const [foundUser, setFoundUser] = useState(null)
  const [question, setQuestion] = useState('')
  const [showResetForm, setShowResetForm] = useState(false)

  const userSubmit = async (values, { resetForm }) => {
    try {
      const { username } = values

      const response = await securityQuestionService.findUser(username)
      if (response) {
        setQuestion(response.question)
        setFoundUser(username)
        resetForm()
      }
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 3, true))
    }
  }

  const answerSubmit = async (values, { resetForm }) => {
    try {
      const { answer } = values

      const response = await securityQuestionService.checkAnswer(foundUser, answer)
      if (response) {
        setToken(response.token)
        setShowResetForm(true)
        resetForm()
      }
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 3, true))
    }
  }

  const newPasswordSubmit = async (values, { resetForm }) => {
    try {
      const { newPassword } = values
      console.log(newPassword)
      const response = await userService.updatePassword(foundUser, newPassword)
      console.log(response)
      if (response) {
        dispatch(setNotification(response.message, 3))
        dispatch(onClose())
        dispatch(setLoginModalOpen())
      }
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 3, true))
    }
  }

  return (
    <div className='mt-3'>
      {!foundUser ? (
        <Formik
          initialValues={{
            username: '',
            answer: '',
            newPassword: '',
            confirmNewPassword: ''
          }}
          onSubmit={userSubmit}
        >
          {({ values }) => (
            <Form>
              <Field
                type='text'
                name='username'
                label='Enter your username'
                as={TextField}
                variant='filled'
                className='bg-white'
              />
              <div className='mt-5'>
                <Button text={'continue'} type='submit' />
              </div>
            </Form>
          )}
        </Formik>
      ) : !showResetForm ? (
        <Formik
          initialValues={{
            answer: ''
          }}
          onSubmit={answerSubmit}
        >
          {({ values }) => (
            <Form>
              <p className='mb-5 text-sm text-gray-500 dark:text-gray-300'>
                <strong>{question} </strong>
              </p>
              <Field
                type='text'
                name='answer'
                label='Your answer'
                as={TextField}
                variant='filled'
                className='bg-white'
              />
              <div className='mt-5'>
                <Button text={'continue'} type='submit' />
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            newPassword: '',
            confirmNewPassword: ''
          }}
          onSubmit={newPasswordSubmit}
          validationSchema={passwordValidationSchema}
        >
          {({ values }) => (
            <Form>
              <Field
                type='password'
                name='newPassword'
                label='Enter new password'
                as={TextField}
                variant='filled'
                className='bg-white'
              />
              <Field
                type='password'
                name='confirmNewPassword'
                label='Confirm new password'
                as={TextField}
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
              <div className='mt-5'>
                <Button text={'Change password'} type='submit' />
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  )
}

export default PasswordReset
