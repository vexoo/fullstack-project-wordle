import '../../styles/Header/Header.css'
import '../../styles/colors.css'

import { useSelector, useDispatch } from 'react-redux'

import logoutService from '../../services/logout'
import {
  setHelpModalOpen,
  setSettingsModalOpen,
  setStatsModalOpen,
  setLoginModalOpen,
  setSignUpModalOpen,
  setUserModalOpen
} from '../../reducers/modalReducer'
import { clearUser, isUserSetSelector } from '../../reducers/userReducer'

import { IconButton, Button, AppBar, Toolbar, Typography, Box } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import BarChartIcon from '@mui/icons-material/BarChart'
import { removeLocalLoggedUser } from '../../util/localStorageHelper'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
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

  const handleClick = () => {
    console.log(user)
    console.log(isUserSet)
  }

  return (
    <AppBar position='relative' sx={{ bgcolor: 'var(--black)' }}>
      <Toolbar>
        <Box
          sx={{
            ...boxStyle,
            left: '16px'
          }}
        >
          <IconButton color='inherit' onClick={handleClick}>
            {/* onClick={() => dispatch(setHelpModalOpen())} */}
            <HelpOutlineIcon />
          </IconButton>

          <IconButton
            color='inherit'
            onClick={() => dispatch(setSettingsModalOpen())}
          >
            <SettingsIcon />
          </IconButton>

          <IconButton color='inherit' onClick={() => dispatch(setStatsModalOpen())}>
            <BarChartIcon />
          </IconButton>
        </Box>
        <Typography variant='h6' align='center' sx={titleStyle}>
          WORDLE
        </Typography>
        <Box
          sx={{
            ...boxStyle,
            right: '16px'
          }}
        >
          {isUserSet ? (
            <div>
              <Button onClick={() => dispatch(setUserModalOpen())}>
                {user.username}
              </Button>
              <Button color='inherit' onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button onClick={() => dispatch(setSignUpModalOpen())} color='inherit'>
                Sign up
              </Button>
              <Button onClick={() => dispatch(setLoginModalOpen())} color='inherit'>
                Login
              </Button>
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header

const titleStyle = {
  flexGrow: 1,
  fontFamily: 'monospace',
  fontSize: '40px',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none'
}

const boxStyle = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row'
}
