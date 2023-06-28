import { createSlice } from '@reduxjs/toolkit'
import { setWinStats } from './userReducer'
import { setLocalGameState } from '../util/localStorageHelper'

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: {
    playing: true,
    won: false
  },
  reducers: {
    setWon(state, action) {
      state.playing = false
      state.won = true
      setLocalGameState('won')
    },
    setLost(state, action) {
      state.playing = false
      state.won = false
			setLocalGameState('lost')
    },
    setPlaying(state, action) {
      state.won = false
      state.playing = true
			setLocalGameState('playing')
    }
  }
})

export const { setWon, setLost, setPlaying } = gameStateSlice.actions
export default gameStateSlice.reducer
