import BaseModal from '../BaseModal/BaseModal'
import Help from '../../Help'
import { helpModalTitle } from '../../../util/strings'

const HelpModal = ({ isOpen, handleClose }) => {
  return (
    <BaseModal title={helpModalTitle} isOpen={isOpen} handleClose={handleClose}>
      <div className='mt-2 flex flex-col divide-y'>
        <Help />
      </div>
    </BaseModal>
  )
}

export default HelpModal
