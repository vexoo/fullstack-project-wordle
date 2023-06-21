import { createSlice, current } from '@reduxjs/toolkit'
import { setLost, setWon } from './gameStateReducer'
import { useDispatch, useSelector } from 'react-redux'
import userService from '../services/user'

const updateStats = state => {
  if (state) {
    const { username, played, won, currStreak, maxStreak, guessDistribution } = state
    const stats = {
      played,
      won,
      currStreak,
      maxStreak,
      guessDistribution
    }
    userService.updateStats(username, stats)
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    clearUser: () => {
      return null
    },
    setWinStats: (state, action) => {
      const currentRow = action.payload
      console.log(currentRow)
      if (state) {
        state.played += 1
        state.won += 1
        state.currStreak += 1
        state.maxStreak = Math.max(state.currStreak, state.maxStreak)
        state.guessDistribution = state.guessDistribution.map((value, index) =>
          index === currentRow ? value + 1 : value
        )
        updateStats(state)
      }
    },
    setLossStats: state => {
      if (state) {
        state.played += 1
        state.currStreak = 0
        updateStats(state)
      }
    }
  }
})

export const { setUser, clearUser, setWinStats, setLossStats } = userSlice.actions

export const isUserSetSelector = state => {
  const user = state.user
  return user !== null
}

export default userSlice.reducer
