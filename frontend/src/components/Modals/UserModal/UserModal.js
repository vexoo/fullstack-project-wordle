import BaseModal from '../BaseModal/BaseModal'
import UserInfo from '../../UserInfo/UserInfo'

const UserModal = ({ isOpen, handleClose }) => {
  return (
    <BaseModal
      title={'Account information'}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <UserInfo />
    </BaseModal>
  )
}

export default UserModal
