import '../../styles/Header/Header.css'
import '../../styles/colors.css'
import { useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import BarChartIcon from '@mui/icons-material/BarChart'

import Login from '../Login'

import {
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Modal
} from '@mui/material'

const Header = () => {
  const [user, setUser] = useState('')
  const [isHelpModalOpen, setHelpModalOpen] = useState(false)
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false)
  const [isStatsModalOpen, setStatsModalOpen] = useState(false)
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)

  const handleHelpButtonClick = () => {
    setHelpModalOpen(true)
  }

  const handleSettingsButtonClick = () => {
    setSettingsModalOpen(true)
  }

  const handleStatsButtonClick = () => {
    setStatsModalOpen(true)
  }

  const handleLoginButtonClick = () => {
    setLoginModalOpen(true)
  }

  const handleCloseModal = () => {
    setHelpModalOpen(false)
    setSettingsModalOpen(false)
    setStatsModalOpen(false)
    setLoginModalOpen(false)
  }

  return (
    <>
      <AppBar position='static' sx={{ bgcolor: 'var(--black)' }}>
        <Toolbar>
          <Box
            sx={{
              position: 'absolute',
              left: '16px',
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <IconButton color='inherit' onClick={() => setHelpModalOpen(true)}>
              <HelpOutlineIcon />
            </IconButton>
            <IconButton color='inherit' onClick={handleSettingsButtonClick}>
              <SettingsIcon />
            </IconButton>
            <IconButton color='inherit' onClick={handleStatsButtonClick}>
              <BarChartIcon />
            </IconButton>
          </Box>
          <Typography
            variant='h6'
            align='center'
            sx={{
              flexGrow: 1,
              fontFamily: 'monospace',
              fontSize: '40px',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            WORDLE
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              right: '16px',
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <p>{user ? user.username : ''}</p>
            <Button onClick={handleLoginButtonClick} color='inherit'>
              Login
            </Button>
            <Button color='inherit'>Sign up</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Help Modal */}
      <Modal
        open={isHelpModalOpen}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          sx={{
            width: '10px', // Custom width
            height: '10px', // Custom height
            backgroundColor: 'white',
            padding: '10px',
            border: '1px solid white', // Border style
            borderRadius: '10px' // Border radius
          }}
        >
          Help Modal Content
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal open={isSettingsModalOpen} onClose={handleCloseModal}>
        <div>Settings Modal Content</div>
      </Modal>

      {/* Stats Modal */}
      <Modal open={isStatsModalOpen} onClose={handleCloseModal}>
        <div>Stats Modal Content</div>
      </Modal>

      {/* Login Modal */}
      <Modal
        open={isLoginModalOpen}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 300
        }}
      >
        <div
          sx={{
            bgcolor: 'white',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            minWidth: 300
          }}
        >
          <Login setUser={setUser} setLoginModalOpen={setLoginModalOpen} />
        </div>
      </Modal>
    </>
  )
}

/*
const Header = () => {
  const handleClick = buttonName => {
    console.log(`${buttonName} clicked`)
  }
  return (
    <AppBar position='static' sx={{ bgcolor: 'var(--black)' }}>
      <Toolbar>
        <Box
          sx={{
            position: 'absolute',
            left: '16px',
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <IconButton color='inherit'>
            <HelpOutlineIcon />
          </IconButton>
          <IconButton color='inherit'>
            <SettingsIcon />
          </IconButton>
          <IconButton color='inherit'>
            <BarChartIcon />
          </IconButton>
        </Box>
        <Typography
          variant='h6'
          align='center'
          sx={{
            flexGrow: 1,
            fontFamily: 'monospace',
            fontSize: '40px',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          WORDLE
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            right: '16px',
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <p>username</p>
          <Button color='inherit'>Login</Button>
          <Button color='inherit'>Sign up</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
*/

export default Header
