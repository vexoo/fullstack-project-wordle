import { passwordResetModalTitle } from '../../../util/strings'
import PasswordReset from '../../PasswordReset'
import BaseModal from '../BaseModal/BaseModal'

const PasswordResetModal = ({ isOpen, handleClose }) => {
  return (
    <BaseModal
      title={passwordResetModalTitle}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className='mt-2 flex flex-col divide-y'>
        <PasswordReset />
      </div>
    </BaseModal>
  )
}

export default PasswordResetModal
