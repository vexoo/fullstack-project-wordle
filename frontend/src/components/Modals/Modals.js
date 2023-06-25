import '../../styles/Header/Header.css'
import '../../styles/colors.css'

import { useSelector, useDispatch } from 'react-redux'
import { Modal } from '@mui/material'

import Login from '../Login'
import SignUp from '../SignUp'
import Stats from '../Stats'
import { onClose } from '../../reducers/modalReducer'
import UserInfo from '../UserInfo'

const Modals = () => {
  const dispatch = useDispatch()
  const {
    isHelpModalOpen,
    isSettingsModalOpen,
    isStatsModalOpen,
    isLoginModalOpen,
    isSignUpModalOpen,
    isUserModalOpen
  } = useSelector(state => state.modals)

  return (
    <div>
      {/* Help Modal */}
      <Modal
        open={isHelpModalOpen}
        onClose={() => dispatch(onClose())}
        sx={modalStyle}
      >
        <div>Help Modal Content</div>
      </Modal>

      {/* Settings Modal */}
      <Modal
        open={isSettingsModalOpen}
        onClose={() => dispatch(onClose())}
        sx={modalStyle}
      >
        <div>Settings Modal Content</div>
      </Modal>

      {/* Stats Modal */}
      <Modal
        open={isStatsModalOpen}
        onClose={() => dispatch(onClose())}
        sx={modalStyle}
      >
        <div>
          <Stats />
        </div>
      </Modal>

      {/* Login Modal */}
      <Modal
        open={isLoginModalOpen}
        onClose={() => dispatch(onClose())}
        sx={modalStyle}
      >
        <div>
          <Login />
        </div>
      </Modal>

      {/* Signup Modal */}
      <Modal
        open={isSignUpModalOpen}
        onClose={() => dispatch(onClose())}
        sx={modalStyle}
      >
        <div>
          <SignUp />
        </div>
      </Modal>

      {/* User Modal */}
      <Modal
        open={isUserModalOpen}
        onClose={() => dispatch(onClose())}
        sx={modalStyle}
      >
        <div>
          <UserInfo />
        </div>
      </Modal>
    </div>
  )
}

export default Modals

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
