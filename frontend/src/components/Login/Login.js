import '../../styles/Header/Header.css'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField, Button } from '@mui/material'

import loginService from '../../services/login'
import { setToken } from '../../util/config'
import { setUser } from '../../reducers/userReducer'
import { onClose } from '../../reducers/modalReducer'

const Login = () => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user)
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
      window.localStorage.setItem('loggedWordleUser', JSON.stringify(user))
      setToken(user.token)
      dispatch(
        setUser({
          username: user.username,
          token: user.token
        })
      )
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
    <div className='modal'>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <TextField
            label='username'
            onChange={({ target }) => setUsername(target.value)}
            inputRef={usernameRef}
          />
        </div>
        <div>
          <TextField
            label='password'
            type='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <Button variant='contained' color='primary' type='submit'>
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login
