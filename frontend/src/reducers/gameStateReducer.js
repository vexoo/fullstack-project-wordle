import { createSlice } from '@reduxjs/toolkit'

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: {
    playing: true,
    won: false,
  },
  reducers: {
    setWon(state, action) {
      state.playing = false
      state.won = true
    },
    setLost(state, action) {
      state.playing = false
    },
    setPlaying(state, action) {
      state.won = false
      state.playing = true
    }
  }
})

export const { setWon, setLost, setPlaying } = gameStateSlice.actions

export default gameStateSlice.reducer
