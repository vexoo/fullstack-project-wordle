import BaseModal from '../BaseModal/BaseModal'
import SignUp from '../../SignUp'
import { signupModalTitle } from '../../../util/strings'

const SignUpModal = ({ isOpen, handleClose }) => {
  return (
    <BaseModal title={signupModalTitle} isOpen={isOpen} handleClose={handleClose}>
      <div className='mt-2 flex flex-col divide-y'>
        <SignUp />
      </div>
    </BaseModal>
  )
}

export default SignUpModal
