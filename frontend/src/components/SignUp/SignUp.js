import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import loginService from '../../services/login'
import userService from '../../services/user'
import securityQuestionService from '../../services/securityQuestion'
import InputForm from '../InputForm'
import SecurityQuestion from './SecurityQuestion'
import { setToken } from '../../util/config'
import { setLocalLoggedUser } from '../../util/localStorageHelper'
import { setUser } from '../../reducers/userReducer'
import { onClose } from '../../reducers/modalReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { signUpButtonText, signupNotification } from '../../util/strings'
import { Formik, Form } from 'formik'
import Button from '../Button'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters'),
  securityQuestion: Yup.string().required('Security question is required'),
  answer: Yup.string().required('Answer is required')
})

const SignUp = () => {
  const dispatch = useDispatch()
  const { isSignUpModalOpen } = useSelector(state => state.modals)
  const usernameRef = useRef(null)

  const onSubmit = async (values, { resetForm }) => {
    try {
      const { username, password, securityQuestion, answer } = values
      await userService.create({ username, password })
      const user = await loginService.login({ username, password })
      await securityQuestionService.create(username, securityQuestion, answer)

      setLocalLoggedUser(user)
      setToken(user.token)
      dispatch(setUser(user))
      resetForm()
      dispatch(onClose())
      dispatch(setNotification(signupNotification, 3))
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 3, true))
    }
  }

  useEffect(() => {
    if (isSignUpModalOpen) {
      usernameRef.current.focus()
    }
  }, [isSignUpModalOpen])

  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          password: '',
          securityQuestion: '',
          answer: ''
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form>
            <InputForm usernameRef={usernameRef} />
            <div className='mt-5'>
              <SecurityQuestion values={values} />
            </div>
            <div className='mt-5'>
              <Button text={signUpButtonText} type='submit' />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUp
