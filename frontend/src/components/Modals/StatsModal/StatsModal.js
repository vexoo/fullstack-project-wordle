import BaseModal from '../BaseModal/BaseModal'
import Stats from '../../Stats/Stats'
import { statsModalTitle } from '../../../util/strings'

const StatsModal = ({ isOpen, handleClose }) => {
  return (
    <BaseModal title={statsModalTitle} isOpen={isOpen} handleClose={handleClose}>
      <Stats />
    </BaseModal>
  )
}

export default StatsModal
