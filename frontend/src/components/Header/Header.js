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
  signUpButtonText
} from '../../util/strings'

const Header = () => {
  const dispatch = useDispatch()
  const isUserSet = useSelector(isUserSetSelector)

  const handleLogout = async () => {
    try {
      await logoutService.logout()
      dispatch(clearUser())
      removeLocalLoggedUser()
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
            <button
              id='logout-button'
              className='text-x2 font-bold uppercase dark:text-white'
              onClick={handleLogout}
            >
              {logoutButtonText}
            </button>
          </div>
        ) : (
          <div className='right-icons'>
            <button
              id='signup-button'
              className='text-x2 mr-3 uppercase dark:text-white'
              onClick={() => dispatch(setSignUpModalOpen())}
            >
              {signUpButtonText}
            </button>
            <button
              id='login-button'
              className='text-x2 uppercase dark:text-white'
              onClick={() => dispatch(setLoginModalOpen())}
            >
              {loginButtonText}
            </button>
          </div>
        )}
      </div>
      <hr></hr>
    </div>
  )
}

export default Header
