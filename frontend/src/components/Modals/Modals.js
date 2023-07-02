import { useSelector, useDispatch } from 'react-redux'
import SettingsModal from './SettingsModal'
import LoginModal from './LoginModal'
import SignUpModal from './SignUpModal'
import UserModal from './UserModal'
import StatsModal from './StatsModal'
import HelpModal from './HelpModal'
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

      <HelpModal isOpen={isHelpModalOpen} handleClose={() => dispatch(onClose())} />
    </div>
  )
}

export default Modals
