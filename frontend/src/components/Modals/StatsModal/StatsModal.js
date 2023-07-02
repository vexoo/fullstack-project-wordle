import BaseModal from '../BaseModal/BaseModal'
import Stats from '../../Stats/Stats'

const StatsModal = ({ isOpen, handleClose }) => {
  return (
    <BaseModal title={'Statistics'} isOpen={isOpen} handleClose={handleClose}>
      <Stats />
    </BaseModal>
  )
}

export default StatsModal
