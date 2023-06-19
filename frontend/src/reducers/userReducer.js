import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: { username: null, token: null },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username
      state.token = action.payload.token
    },
    clearUser: state => {
      state.username = null
      state.token = null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export const isUserSetSelector = state => {
  const { username, token } = state.user
  return username !== null && token !== null
}

export default userSlice.reducer
