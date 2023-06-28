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
    <div className='navbar'>
      <div className='navbar-content short:h-auto px-5'>
        <div className='flex'>
          <InformationCircleIcon className='h-6 w-6 cursor-pointer dark:stroke-white' />
          <ChartBarIcon
            className='ml-3 mr-3 h-6 w-6 cursor-pointer dark:stroke-white'
            onClick={() => dispatch(setStatsModalOpen())}
          />
          <CogIcon
            className='h-6 w-6 cursor-pointer dark:stroke-white'
            onClick={() => dispatch(setSettingsModalOpen())}
          />
        </div>
        <p className='text-3xl font-bold dark:text-white'>W O R D L E</p>
        {isUserSet ? (
          <div className='right-icons'>
            <UserIcon
              className='mr-3 h-6 w-6 cursor-pointer dark:stroke-white'
              onClick={() => dispatch(setUserModalOpen())}
            />
            <button
              className='text-x2 font-bold dark:text-white'
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <div className='right-icons'>
            <button
              className='text-x2 mr-3 dark:text-white'
              onClick={() => dispatch(setSignUpModalOpen())}
            >
              SIGN UP
            </button>
            <button
              className='text-x2 dark:text-white'
              onClick={() => dispatch(setLoginModalOpen())}
            >
              LOGIN
            </button>
          </div>
        )}
      </div>
      <hr></hr>
    </div>
  )
}

export default Header
