import BaseModal from '../BaseModal/BaseModal'
import Login from '../../Login'
import { loginModalTitle } from '../../../util/strings'

const LoginModal = ({ isOpen, handleClose }) => {
  return (
    <BaseModal title={loginModalTitle} isOpen={isOpen} handleClose={handleClose}>
      <div className='mt-2 flex flex-col divide-y'>
        <Login />
      </div>
    </BaseModal>
  )
}

export default LoginModal
