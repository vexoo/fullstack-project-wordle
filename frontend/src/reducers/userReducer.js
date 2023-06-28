import { createSlice, current } from '@reduxjs/toolkit'
import { setLost, setWon } from './gameStateReducer'
import { onClose } from './modalReducer'
import { useDispatch, useSelector } from 'react-redux'
import userService from '../services/user'
import logoutService from '../services/logout'
import {
  getLocalLoggedUser,
  removeLocalLoggedUser,
  setLocalLoggedUser
} from '../util/localStorageHelper'

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
    setUsername: (state, action) => {
      if (state) {
        state.username = action.payload
      }
    },
    setWinStats: (state, action) => {
      const currentRow = action.payload
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

export const { setUser, clearUser, setUsername, setWinStats, setLossStats } =
  userSlice.actions

const updateStats = state => {
  if (state) {
    try {
      const { username, played, won, currStreak, maxStreak, guessDistribution } =
        state
      const stats = {
        played,
        won,
        currStreak,
        maxStreak,
        guessDistribution
      }
      const updatedUser = { ...getLocalLoggedUser(), ...stats }
      userService.updateStats(username, stats)
      setLocalLoggedUser(updatedUser)
    } catch (e) {
      console.log(e)
    }
  }
}

export const changeUsername = newUsername => {
  return async (dispatch, getState) => {
    const { user } = getState()
    console.log(user)
    try {
      await userService.updateUsername(user.username, newUsername)
      dispatch(setUsername(newUsername))
      const updatedUser = { ...user, username: newUsername }
      setLocalLoggedUser(updatedUser)
    } catch (e) {
      console.log(e)
    }
  }
}

export const deleteUser = () => {
  return async (dispatch, getState) => {
    const { user } = getState()
    try {
      await userService.deleteAccount(user.username)
      await logoutService.logout()
      dispatch(clearUser())
      removeLocalLoggedUser()
      dispatch(onClose())
    } catch (e) {
      console.log(e)
    }
  }
}

export const isUserSetSelector = state => {
  const user = state.user
  return user !== null
}

export default userSlice.reducer
