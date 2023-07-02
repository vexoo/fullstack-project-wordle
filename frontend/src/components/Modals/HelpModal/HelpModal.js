import BaseModal from '../BaseModal/BaseModal'
import Help from '../../Help'

const HelpModal = ({ isOpen, handleClose }) => {
  return (
    <BaseModal title='How to play' isOpen={isOpen} handleClose={handleClose}>
      <div className='mt-2 flex flex-col divide-y'>
        <Help />
      </div>
    </BaseModal>
  )
}

export default HelpModal
