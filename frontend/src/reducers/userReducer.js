import { createSlice } from '@reduxjs/toolkit'
import { onClose } from './modalReducer'
import userService from '../services/user'
import logoutService from '../services/logout'
import {
  getLocalLoggedUser,
  removeLocalLoggedUser,
  setLocalLoggedUser
} from '../util/localStorageHelper'
import { setNotification } from './notificationReducer'
import {
  accountDeletionNotification,
  usernameChangeNotification
} from '../util/strings'

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
      const winningRow = action.payload
      if (state) {
        state.played += 1
        state.won += 1
        state.currStreak += 1
        state.maxStreak = Math.max(state.currStreak, state.maxStreak)
        state.guessDistribution = state.guessDistribution.map((value, index) =>
          index === winningRow ? value + 1 : value
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
  try {
    const { username, played, won, currStreak, maxStreak, guessDistribution } = state
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

/*
export const setUser = (user, notification) => {
  return async (dispatch) => {
			dispatch(setUser(user))
      dispatch(onClose())
      dispatch(setNotification(notification, 3))
  }
}
*/

export const changeUsername = newUsername => {
  return async (dispatch, getState) => {
    const { user } = getState()
    try {
      await userService.updateUsername(user.username, newUsername)
      dispatch(setUsername(newUsername))
      const updatedUser = { ...user, username: newUsername }
      setLocalLoggedUser(updatedUser)
      dispatch(setNotification(usernameChangeNotification, 3))
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 5, true))
    }
  }
}

export const changePassword = (currentPassword, newPassword) => {
  return async (dispatch, getState) => {
    const { user } = getState()
    try {
      const passwordMatch = await userService.checkPassword(
        user.username,
        currentPassword
      )
      if (passwordMatch) {
        const response = await userService.updatePassword(user.username, newPassword)
        dispatch(setNotification(response.message, 3))
      }
    } catch (e) {
      dispatch(setNotification(e.response.data.error, 5, true))
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
      dispatch(setNotification(accountDeletionNotification, 3))
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
