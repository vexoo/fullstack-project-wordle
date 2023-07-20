import { createSlice } from '@reduxjs/toolkit'
import { setWinStats, setLossStats } from './userReducer'
import { setNotification } from './notificationReducer'
import { setLocalGameState, getLocalDailyWord } from '../util/localStorageHelper'
import { setStatsModalOpen } from './modalReducer'
import { victoryText } from '../util/strings'

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

export const handleWin = () => {
  return (dispatch, getState) => {
    const { currentRow } = getState().board
    dispatch(setWon())
    dispatch(setWinStats(currentRow - 1))
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * victoryText.length)
      dispatch(setNotification(victoryText[randomIndex], 3))
    }, 1500)
    setTimeout(() => {
      dispatch(setStatsModalOpen())
    }, 3000)
  }
}

export const handleLoss = () => {
  return dispatch => {
    dispatch(setLost())
    dispatch(setLossStats())
    setTimeout(() => {
      dispatch(setNotification(getLocalDailyWord(), 3, true))
    }, 1500)
    setTimeout(() => {
      dispatch(setStatsModalOpen())
    }, 3000)
  }
}
export const { setWon, setLost, setPlaying } = gameStateSlice.actions
export default gameStateSlice.reducer
