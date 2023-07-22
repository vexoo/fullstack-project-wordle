import { createSlice } from '@reduxjs/toolkit'
import { tryAmount, wordLength } from '../util/config'
import { joinWord } from '../util/helpers'
import { setLocalWordleBoard } from '../util/localStorageHelper'
import wordService from '../services/words'
import { setNotification } from './notificationReducer'
import { wordNotFoundNotification } from '../util/strings'

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: Array.from({ length: tryAmount }, () => new Array(wordLength).fill('')),
    currentRow: 0,
    currentColumn: 0
  },
  reducers: {
    letterPress(state, action) {
      state.board[state.currentRow][state.currentColumn] = action.payload
      state.currentColumn = state.currentColumn + 1
    },
    clearPress(state) {
      state.currentColumn = state.currentColumn - 1
      state.board[state.currentRow][state.currentColumn] = ''
    },
    enterPress(state) {
      state.currentColumn = 0
      state.currentRow = state.currentRow + 1
      setLocalWordleBoard(state)
    },
    setBoard(state, action) {
      state.board = action.payload.board
      state.currentRow = action.payload.currentRow
      state.currentColumn = action.payload.currentColumn
    }
  }
})

export const {
  letterPress,
  clearPress,
  enterPress,
  setBoard,
  enableEnter,
  disableEnter
} = boardSlice.actions

export const enterHandler = () => {
  return async (dispatch, getState) => {
    const { board, currentRow } = getState().board
    try {
      const word = joinWord(board[currentRow])
      const exists = await wordService.checkWord(word)
      if (exists) {
        dispatch(enterPress())
      } else {
        dispatch(setNotification(wordNotFoundNotification, 3, true))
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default boardSlice.reducer
