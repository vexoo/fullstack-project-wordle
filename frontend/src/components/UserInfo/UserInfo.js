import '../../styles/Header/Header.css'
import '../../styles/Modal/Modal.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField, Button, Typography } from '@mui/material'
import { changeUsername, deleteUser } from '../../reducers/userReducer'

const UserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [newUsername, setNewUsername] = useState('')
  const [isEditingUsername, setIsEditingUsername] = useState(false)

  const handleUsernameUpdate = event => {
    event.preventDefault()
    dispatch(changeUsername(newUsername))
    setNewUsername('')
    setIsEditingUsername(false)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      if (window.confirm('This action is irreversible. Are you absolutely sure?')) {
        dispatch(deleteUser())
      }
    }
  }

  return (
    <div className='modal'>
      <h1>Account Information</h1>
      <div className='user-info-container'>
        <Typography variant='body1'>
          <strong>Username: </strong> {user.username}
        </Typography>
        {isEditingUsername ? (
          <form onSubmit={handleUsernameUpdate}>
            <div>
              <TextField
                label='New Username'
                value={newUsername}
                onChange={({ target }) => setNewUsername(target.value)}
              />
            </div>
            <div>
              <Button
                className='user-info-buttons'
                variant='contained'
                type='submit'
              >
                Save Username
              </Button>
              <Button
                variant='contained'
                onClick={() => setIsEditingUsername(false)}
              >
                Cancel
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
      <div style={{ marginRight: '215px', marginTop: 'auto', marginBottom: '25px' }}>
        <Button variant='contained' color='secondary' onClick={handleDelete}>
          Delete Account
        </Button>
      </div>
    </div>
  )
}

export default UserInfo
