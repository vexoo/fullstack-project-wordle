import '../../styles/Header/Header.css'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import loginService from '../../services/login'
import InputForm from '../InputForm'
import { setToken } from '../../util/config'
import { setLocalLoggedUser } from '../../util/localStorageHelper'
import { setUser } from '../../reducers/userReducer'
import { onClose } from '../../reducers/modalReducer'

const Login = () => {
  const dispatch = useDispatch()
  const { isLoginModalOpen } = useSelector(state => state.modals)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const usernameRef = useRef(null)

  const onSubmit = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      setLocalLoggedUser(user)
      setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(onClose())
    } catch (exception) {
      //setErrorMessage('Wrong credentials')
      console.log(exception)
      /*setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
    }
  }

  useEffect(() => {
    if (isLoginModalOpen) {
      usernameRef.current.focus()
    }
  }, [isLoginModalOpen])

  return (
    <InputForm
      onSubmit={onSubmit}
      usernameRef={usernameRef}
      setUsername={setUsername}
      setPassword={setPassword}
      buttonText={'Login'}
    />
  )
}

export default Login
