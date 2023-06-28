import { useState, useEffect } from 'react'
import { getLocalTheme, setLocalTheme } from '../../../util/localStorageHelper'
import BaseModal from '../BaseModal/BaseModal'
import Stats from '../../Stats/Stats'
import { useSelector } from 'react-redux'
import { TextField, Button } from '@mui/material'

const StatsModal = ({ isOpen, handleClose }) => {
  return (
    <BaseModal title={'Statistics'} isOpen={isOpen} handleClose={handleClose}>
      <Stats />
    </BaseModal>
  )
}

export default StatsModal
