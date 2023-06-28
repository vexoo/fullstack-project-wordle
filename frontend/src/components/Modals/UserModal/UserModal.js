import { useState, useEffect } from 'react'
import { getLocalTheme, setLocalTheme } from '../../../util/localStorageHelper'
import BaseModal from '../BaseModal/BaseModal'
import UserInfo from '../../UserInfo/UserInfo'
import { useSelector } from 'react-redux'
import { TextField, Button } from '@mui/material'

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
