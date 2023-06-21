import '../../styles/Header/Header.css'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField, Button } from '@mui/material'

import loginService from '../../services/login'
import { setToken } from '../../util/config'
import { setUser } from '../../reducers/userReducer'
import { onClose } from '../../reducers/modalReducer'

const InputForm = ({
  onSubmit,
  usernameRef,
  setUsername,
  setPassword,
  buttonText,
	titleText
}) => {
  return (
    <div className='modal'>
      <h1>{titleText}</h1>
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
          <Button variant='contained' type='submit'>
            {buttonText}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default InputForm
