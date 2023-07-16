import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import loginService from '../../services/login'
import InputForm from '../InputForm'
import { setLocalLoggedUser } from '../../util/localStorageHelper'
import { setUser } from '../../reducers/userReducer'
import { onClose, setPasswordResetModalOpen } from '../../reducers/modalReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { Formik, Form } from 'formik'
import Button from '../Button'
import {
  loginButtonText,
  loginNotification,
  openPasswordResetButtonText
} from '../../util/strings'
import { setToken } from '../../util/config'

const Login = () => {
  const dispatch = useDispatch()
  const { isLoginModalOpen } = useSelector(state => state.modals)
  const usernameRef = useRef(null)

  const onSubmit = async (values, { resetForm }) => {
    try {
      const user = await loginService.login({
        username: values.username,
        password: values.password
      })
      setLocalLoggedUser(user)
      setToken(user.token)
      dispatch(setUser(user))
      resetForm()
      dispatch(onClose())
      dispatch(setNotification(loginNotification, 3))
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 3, true))
    }
  }

  const handlePasswordResetTransition = () => {
    dispatch(onClose())
    dispatch(setPasswordResetModalOpen())
  }

  useEffect(() => {
    if (isLoginModalOpen) {
      usernameRef.current.focus()
    }
  }, [isLoginModalOpen])

  return (
    <div className='mt-4'>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <InputForm usernameRef={usernameRef} />
          <div className='mt-5'>
            <Button text={loginButtonText} type='submit' id='modal-login-button' />
          </div>
        </Form>
      </Formik>
      <div className='absolute bottom-0 right-0'>
        <Button
          className='mr-3 dark:text-gray-400'
          onClick={handlePasswordResetTransition}
          text={openPasswordResetButtonText}
          buttonType='text'
        />
      </div>
    </div>
  )
}

export default Login
