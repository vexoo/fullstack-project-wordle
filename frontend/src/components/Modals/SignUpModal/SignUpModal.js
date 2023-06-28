import BaseModal from '../BaseModal/BaseModal'
import SignUp from '../../SignUp'

const SignUpModal = ({ isOpen, handleClose }) => {
  return (
    <BaseModal title='Sign up' isOpen={isOpen} handleClose={handleClose}>
      <div className='mt-2 flex flex-col divide-y'>
        <SignUp />
      </div>
    </BaseModal>
  )
}

export default SignUpModal
