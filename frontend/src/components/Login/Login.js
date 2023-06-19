import '../../styles/Header/Header.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button
} from '@mui/material'

import loginService from '../../services/login'
import { setUser, clearUser } from '../../reducers/userReducer'

const Login = props => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async event => {
    event.preventDefault()

    try {
      await loginService.login({
        username,
        password
      })
      dispatch(setUser(username, password))
      setUsername('')
      setPassword('')
      props.setLoginModalOpen(false)
    } catch (exception) {
      //setErrorMessage('Wrong credentials')
      console.log(exception)
      /*setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
    }
  }

  return (
    <div className='modal'>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <TextField
            label='username'
            onChange={({ target }) => setUsername(target.value)}
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
