import BaseModal from '../BaseModal/BaseModal'
import UserInfo from '../../UserInfo/UserInfo'
import { userModalTitle } from '../../../util/strings'

const UserModal = ({ isOpen, handleClose }) => {
  return (
    <BaseModal title={userModalTitle} isOpen={isOpen} handleClose={handleClose}>
      <UserInfo />
    </BaseModal>
  )
}

export default UserModal
