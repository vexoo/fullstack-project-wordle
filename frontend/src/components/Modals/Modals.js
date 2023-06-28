import { useSelector, useDispatch } from 'react-redux'
import SettingsModal from './SettingsModal'
import LoginModal from './LoginModal'
import SignUpModal from './SignUpModal'
import UserModal from './UserModal'
import StatsModal from './StatsModal'
import { onClose } from '../../reducers/modalReducer'

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
      <SettingsModal
        isOpen={isSettingsModalOpen}
        handleClose={() => dispatch(onClose())}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        handleClose={() => dispatch(onClose())}
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        handleClose={() => dispatch(onClose())}
      />

      <UserModal isOpen={isUserModalOpen} handleClose={() => dispatch(onClose())} />

      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => dispatch(onClose())}
      />

      {/* Help Modal 
      <Modal
        open={isHelpModalOpen}
        onClose={() => dispatch(onClose())}
        sx={modalStyle}
      >
        <div>Help Modal Content</div>
      </Modal>
*/}

      {/* Settings Modal 
      <Modal
        open={isSettingsModalOpen}
        onClose={() => dispatch(onClose())}
        sx={modalStyle}
      >
        <div>Settings Modal Content</div>
      </Modal>
*/}
      {/* Stats Modal 
      <Modal
        open={isStatsModalOpen}
        onClose={() => dispatch(onClose())}
        sx={modalStyle}
      >
        <div>
          <Stats />
        </div>
      </Modal>
*/}
      {/* Login Modal 
      <Modal
        open={isLoginModalOpen}
        onClose={() => dispatch(onClose())}
        sx={modalStyle}
      >
        <div>
          <Login />
        </div>
      </Modal>
*/}
      {/* Signup Modal
      <Modal
        open={isSignUpModalOpen}
        onClose={() => dispatch(onClose())}
        sx={modalStyle}
      >
        <div>
          <SignUp />
        </div>
      </Modal>
 */}
      {/* User Modal 
      <Modal
        open={isUserModalOpen}
        onClose={() => dispatch(onClose())}
        sx={modalStyle}
      >
        <div>
          <UserInfo />
        </div>
      </Modal>*/}
    </div>
  )
}

export default Modals
