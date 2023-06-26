import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'

export const SettingsModal = ({
  isOpen,
  handleClose,
  isDarkMode,
  handleDarkMode
}) => {
  return (
    <BaseModal title='Settings' isOpen={isOpen} handleClose={handleClose}>
      <div className='mt-2 flex flex-col divide-y'>
        <SettingsToggle
          settingName='Dark Mode'
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
      </div>
    </BaseModal>
  )
}
