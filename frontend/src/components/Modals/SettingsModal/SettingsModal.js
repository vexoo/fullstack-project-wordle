import { useState, useEffect } from 'react'
import { getLocalTheme, setLocalTheme } from '../../../util/localStorageHelper'
import BaseModal from '../BaseModal/BaseModal'
import SettingsToggle from './SettingsToggle'
import { settingsModalTitle } from '../../../util/strings'

const SettingsModal = ({ isOpen, handleClose }) => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [isDarkMode, setIsDarkMode] = useState(
    getLocalTheme() ? getLocalTheme() === 'dark' : prefersDarkMode ? true : false
  )

  const handleDarkMode = isDark => {
    setIsDarkMode(isDark)
    setLocalTheme(isDark ? 'dark' : 'light')
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <BaseModal title={settingsModalTitle} isOpen={isOpen} handleClose={handleClose}>
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

export default SettingsModal
