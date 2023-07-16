import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notification',
  initialState: { message: null, isError: false },
  reducers: {
    set(state, action) {
      return { message: action.payload.message, isError: action.payload.isError }
    },
    clear() {
      return { message: null, isError: false }
    }
  }
})

export const setNotification = (message, seconds, isError = false) => {
  return async dispatch => {
    dispatch(set({ message, isError }))
    setTimeout(() => {
      dispatch(clear())
    }, seconds * 1000)
  }
}

export const { set, clear } = notifSlice.actions
export default notifSlice.reducer
