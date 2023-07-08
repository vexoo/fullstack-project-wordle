import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField } from '@mui/material'
import Button from '../Button'
import { changeUsername, deleteUser } from '../../reducers/userReducer'

const UserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [newUsername, setNewUsername] = useState('')
  const [isEditingUsername, setIsEditingUsername] = useState(false)

  const handleUsernameUpdate = event => {
    event.preventDefault()
    console.log('hello')
    dispatch(changeUsername(newUsername))
    setNewUsername('')
    setIsEditingUsername(false)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      if (window.confirm('This action is irreversible. Are you absolutely sure?')) {
        dispatch(deleteUser())
        setIsEditingUsername(false)
      }
    }
  }

  return (
    <div className='mt-2 flex flex-col divide-y'>
      <div className='flex justify-between gap-4 py-10'>
        <div className=' ml-10 text-left text-gray-500 dark:text-gray-300'>
          <p className='text-lg leading-none'>
            <strong>Username: </strong>
          </p>
        </div>
        <div className=' mr-10 text-left text-gray-500 dark:text-gray-300'>
          <p className='text-lg leading-none'>{user.username}</p>
        </div>
      </div>
      <div className='flex justify-between gap-4 py-3'>
        {isEditingUsername ? (
          <div>
            <Button onClick={() => setIsEditingUsername(false)} text={'cancel'} />
            <Button
              id='save-newusername-button'
              className='ml-3'
              type='submit'
              onClick={handleUsernameUpdate}
              text={'save'}
            />
          </div>
        ) : (
          <Button
            onClick={() => setIsEditingUsername(true)}
            text={'change username'}
            id='change-username-button'
          />
        )}
        <Button
          id='delete-account-button'
          onClick={() => handleDelete()}
          className={'bg-red-600'}
          text={'delete account'}
        />
      </div>

      <div className='flex py-3'>
        {isEditingUsername ? (
          <form className='flex items-center'>
            <div>
              <TextField
                id='new-username-form'
                className='bg-white'
                label='new username'
                variant='filled'
                onChange={({ target }) => setNewUsername(target.value)}
              />
            </div>
          </form>
        ) : null}
      </div>
    </div>
  )
}

export default UserInfo
