import { createSlice } from '@reduxjs/toolkit'

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: {
    playing: true,
    won: false,
    lost: false
  },
  reducers: {
    setWon(state, action) {
      state.playing = false
      state.won = true
    },
    setLost(state, action) {
      state.playing = false
      state.lost = true
    },
    setPlaying(state, action) {
      state.won = false
      state.lost = false
      state.playing = true
    }
  }
})

export const { setWon, setLost, setPlaying } = gameStateSlice.actions

export default gameStateSlice.reducer
