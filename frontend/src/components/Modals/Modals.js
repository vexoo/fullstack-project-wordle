import '../../styles/Header/Header.css'
import '../../styles/colors.css'

import { useSelector, useDispatch } from 'react-redux'
import { Modal } from '@mui/material'

import Login from '../Login'
import { onClose } from '../../reducers/modalReducer'

const Modals = () => {
  const dispatch = useDispatch()
  const {
    isHelpModalOpen,
    isSettingsModalOpen,
    isStatsModalOpen,
    isLoginModalOpen
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
        <div>Stats Modal Content</div>
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
    </div>
  )
}

export default Modals

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
