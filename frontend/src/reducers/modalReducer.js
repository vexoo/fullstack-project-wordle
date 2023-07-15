import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modals',
  initialState: {
    isHelpModalOpen: false,
    isSettingsModalOpen: false,
    isStatsModalOpen: false,
    isLoginModalOpen: false,
    isSignUpModalOpen: false,
    isUserModalOpen: false,
    isPasswordResetModalOpen: false
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
    setSignUpModalOpen: state => {
      state.isSignUpModalOpen = true
    },
    setUserModalOpen: state => {
      state.isUserModalOpen = true
    },
    setPasswordResetModalOpen: state => {
      state.isPasswordResetModalOpen = true
    },
    onClose: state => {
      Object.keys(state).forEach(key => {
        state[key] = false
      })
    }
  }
})

export const {
  setHelpModalOpen,
  setSettingsModalOpen,
  setStatsModalOpen,
  setLoginModalOpen,
  setSignUpModalOpen,
  setUserModalOpen,
  setPasswordResetModalOpen,
  onClose
} = modalSlice.actions

export const isAnyModalOpen = state => {
  const {
    isHelpModalOpen,
    isSettingsModalOpen,
    isStatsModalOpen,
    isLoginModalOpen,
    isSignUpModalOpen,
    isUserModalOpen,
    isPasswordResetModalOpen
  } = state.modals
  return [
    isHelpModalOpen,
    isSettingsModalOpen,
    isStatsModalOpen,
    isLoginModalOpen,
    isSignUpModalOpen,
    isUserModalOpen,
    isPasswordResetModalOpen
  ].some(Boolean)
}

export default modalSlice.reducer
