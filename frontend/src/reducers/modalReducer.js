import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modals',
  initialState: {
    isHelpModalOpen: false,
    isSettingsModalOpen: false,
    isStatsModalOpen: false,
    isLoginModalOpen: false
  },
  reducers: {
    setHelpModalOpen: state => {
      state.isHelpModalOpen = true
    },
    setSettingsModalOpen: state => {
      state.isSettingsModalOpen = true
    },
    setStatsModalOpen: state => {
      state.isStatsModalOpen = true
    },
    setLoginModalOpen: state => {
      state.isLoginModalOpen = true
    },
    onClose: state => {
      state.isHelpModalOpen = false
      state.isSettingsModalOpen = false
      state.isStatsModalOpen = false
      state.isLoginModalOpen = false
    }
  }
})

export const {
  setHelpModalOpen,
  setSettingsModalOpen,
  setStatsModalOpen,
  setLoginModalOpen,
  onClose
} = modalSlice.actions

export const isAnyModalOpen = state => {
  const {
    isHelpModalOpen,
    isSettingsModalOpen,
    isStatsModalOpen,
    isLoginModalOpen
  } = state.modals
  return [
    isHelpModalOpen,
    isSettingsModalOpen,
    isStatsModalOpen,
    isLoginModalOpen
  ].some(Boolean)
}

export default modalSlice.reducer
