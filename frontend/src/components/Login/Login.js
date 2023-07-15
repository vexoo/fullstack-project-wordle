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
import { loginButtonText, loginNotification } from '../../util/strings'
import { setToken } from '../../util/config'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
})

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
    <div>
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
            <Button text={loginButtonText} type='submit' />
          </div>
        </Form>
      </Formik>
      <div className='absolute bottom-0 right-0'>
        <button
          id='signup-button'
          className='text-x2 mr-3 dark:text-gray-500'
          onClick={handlePasswordResetTransition}
        >
          {'Forgot password?'}
        </button>
      </div>
    </div>
  )
}

export default Login
