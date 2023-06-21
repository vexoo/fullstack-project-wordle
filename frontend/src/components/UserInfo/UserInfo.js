import '../../styles/Header/Header.css'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField, Button } from '@mui/material'

import loginService from '../../services/login'
import { setToken } from '../../util/config'
import { setUser } from '../../reducers/userReducer'
import { onClose } from '../../reducers/modalReducer'

const UserInfo = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user.user)
  const [newUsername, setNewUsername] = useState('')
  const [isEditingUsername, setIsEditingUsername] = useState(false)

  const handleUsernameChange = event => {
    setNewUsername(event.target.value)
  }

  const handleUsernameUpdate = () => {
    //dispatch(setUsernameAction(newUsername))
    setNewUsername('')
    setIsEditingUsername(false)
  }

  const handleDeleteAccount = () => {
    //dispatch(deleteUserAction())
  }

  return (
    <div className='modal'>
      <h1>Account Information</h1>
      <div className='modal-container'>
        <strong>Username: </strong>
        {user.username}
        {isEditingUsername ? (
          <form onSubmit={handleUsernameUpdate}>
            <div>
              <TextField
                label='New Username'
                value={newUsername}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <Button variant='contained' type='submit'>
                Save Username
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <Button variant='contained' onClick={() => setIsEditingUsername(true)}>
              Change Username
            </Button>
          </div>
        )}
      </div>

      <div>
        <Button variant='contained' color='secondary' onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </div>
    </div>
  )
}

export default UserInfo
