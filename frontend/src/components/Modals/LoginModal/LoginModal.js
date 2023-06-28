import BaseModal from '../BaseModal/BaseModal'
import Login from '../../Login'

const LoginModal = ({ isOpen, handleClose }) => {
  return (
    <BaseModal title='Login' isOpen={isOpen} handleClose={handleClose}>
      <div className='mt-2 flex flex-col divide-y'>
        <Login />
      </div>
    </BaseModal>
  )
}

export default LoginModal
