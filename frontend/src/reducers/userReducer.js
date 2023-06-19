import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: { username: null, password: null },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username
      state.password = action.payload.password
    },
    clearUser: state => {
      state.username = null
      state.password = null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export const isUserSetSelector = state => {
  const { username, password } = state.user;
  return username !== null && password !== null;
};

export default userSlice.reducer
