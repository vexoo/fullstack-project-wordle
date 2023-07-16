import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../../reducers/userReducer'
import PasswordChangeForm from './PasswordChangeForm'
import UsernameChangeForm from './UsernameChangeForm'
import ButtonRow from './ButtonRow'
import AccountDetail from './AccountDetail'

const UserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)

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
      <AccountDetail label={'Username'} detail={user.username} />
      <ButtonRow
        isEditingUsername={isEditingUsername}
        setIsEditingUsername={setIsEditingUsername}
        isEditingPassword={isEditingPassword}
        setIsEditingPassword={setIsEditingPassword}
        handleDelete={handleDelete}
      />
      <div className='flex py-1'>
        <UsernameChangeForm
          isEditingUsername={isEditingUsername}
          setIsEditingUsername={setIsEditingUsername}
        />
        <PasswordChangeForm
          isEditingPassword={isEditingPassword}
          setIsEditingPassword={setIsEditingPassword}
        />
      </div>
    </div>
  )
}

export default UserInfo
