import {
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
  UserIcon
} from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux'
import {
  setHelpModalOpen,
  setLoginModalOpen,
  setSettingsModalOpen,
  setSignUpModalOpen,
  setStatsModalOpen,
  setUserModalOpen
} from '../../reducers/modalReducer'
import { clearUser, isUserSetSelector } from '../../reducers/userReducer'
import logoutService from '../../services/logout'
import { removeLocalLoggedUser } from '../../util/localStorageHelper'
import {
  gameTitle,
  loginButtonText,
  logoutButtonText,
  logoutNotification,
  signUpButtonText
} from '../../util/strings'
import Button from '../Button'
import { setNotification } from '../../reducers/notificationReducer'

const Header = () => {
  const dispatch = useDispatch()
  const isUserSet = useSelector(isUserSetSelector)

  const handleLogout = async () => {
    try {
      await logoutService.logout()
      dispatch(clearUser())
      removeLocalLoggedUser()
      dispatch(setNotification(logoutNotification, 3))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='header'>
      <div className='header-content short:h-auto px-5'>
        <div className='flex'>
          <InformationCircleIcon
            id='help-button'
            className='h-6 w-6 cursor-pointer dark:stroke-white'
            onClick={() => dispatch(setHelpModalOpen())}
          />
          <ChartBarIcon
            id='stats-button'
            className='ml-3 mr-3 h-6 w-6 cursor-pointer dark:stroke-white'
            onClick={() => dispatch(setStatsModalOpen())}
          />
          <CogIcon
            id='settings-button'
            className='h-6 w-6 cursor-pointer dark:stroke-white'
            onClick={() => dispatch(setSettingsModalOpen())}
          />
        </div>
        <p
          id='title'
          className='text-3xl font-bold uppercase tracking-widest dark:text-white'
        >
          {gameTitle}
        </p>
        {isUserSet ? (
          <div className='right-icons'>
            <UserIcon
              id='user-button'
              className='mr-3 h-6 w-6 cursor-pointer dark:stroke-white'
              onClick={() => dispatch(setUserModalOpen())}
            />
            <Button
              id='logout-button'
              className='uppercase'
              onClick={handleLogout}
              text={logoutButtonText}
              buttonType='text'
            />
          </div>
        ) : (
          <div className='right-icons'>
            <Button
              id='signup-button'
              className='mr-3 uppercase'
              onClick={() => dispatch(setSignUpModalOpen())}
              text={signUpButtonText}
              buttonType='text'
            />
            <Button
              id='login-button'
              className='uppercase'
              onClick={() => dispatch(setLoginModalOpen())}
              text={loginButtonText}
              buttonType='text'
            />
          </div>
        )}
      </div>
      <hr></hr>
    </div>
  )
}

export default Header
