import Button from '../Button'
import {
  cancelButtonText,
  changePasswordButtonText,
  changeUserNameButtonText,
  deleteAccountButtonText
} from '../../util/strings'

const ButtonRow = ({
  isEditingPassword,
  setIsEditingPassword,
  isEditingUsername,
  setIsEditingUsername,
	handleDelete
}) => {
  return (
    <div className='flex justify-between gap-2 py-2'>
      {isEditingUsername && !isEditingPassword ? (
        <div className='flex'>
          <Button
            onClick={() => setIsEditingUsername(false)}
            text={cancelButtonText}
          />
        </div>
      ) : (
        <Button
          onClick={() => (isEditingPassword ? null : setIsEditingUsername(true))}
          text={changeUserNameButtonText}
          id='change-username-button'
          className={isEditingPassword ? 'opacity-50' : ''}
        />
      )}
      {isEditingPassword && !isEditingUsername ? (
        <div className='flex'>
          <Button
            onClick={() => setIsEditingPassword(false)}
            text={cancelButtonText}
          />
        </div>
      ) : (
        <Button
          id='change-password-button'
          onClick={() => (isEditingUsername ? null : setIsEditingPassword(true))}
          className={`px-2 ${isEditingUsername ? 'opacity-50' : ''}`}
          text={changePasswordButtonText}
        />
      )}
      <Button
        id='delete-account-button'
        onClick={handleDelete}
        className={'bg-red-600 px-2'}
        text={deleteAccountButtonText}
      />
    </div>
  )
}

export default ButtonRow
