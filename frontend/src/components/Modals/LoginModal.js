import { BaseModal } from './BaseModal'
import Login from '../Login'

export const LoginModal = ({ isOpen, handleClose }) => {
  return (
    <BaseModal title='Login' isOpen={isOpen} handleClose={handleClose}>
      <div className='mt-2 flex flex-col divide-y'>
        <Login />
      </div>
    </BaseModal>
  )
}
