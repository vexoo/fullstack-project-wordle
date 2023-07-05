import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import loginService from '../../services/login'
import userService from '../../services/user'
import InputForm from '../InputForm'
import { setToken } from '../../util/config'
import { setLocalLoggedUser } from '../../util/localStorageHelper'
import { setUser } from '../../reducers/userReducer'
import { onClose } from '../../reducers/modalReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { signUpButtonText, signupNotification } from '../../util/strings'

const SignUp = () => {
  const dispatch = useDispatch()
  const { isSignUpModalOpen } = useSelector(state => state.modals)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const usernameRef = useRef(null)

  const onSubmit = async event => {
    event.preventDefault()

    try {
      const newUser = await userService.create({
        username,
        password
      })
      const user = await loginService.login({
        username,
        password
      })
      console.log(newUser)
      setLocalLoggedUser(user)
      setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
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
    <InputForm
      onSubmit={onSubmit}
      usernameRef={usernameRef}
      setUsername={setUsername}
      setPassword={setPassword}
      buttonText={signUpButtonText}
    />
  )
}

export default SignUp
