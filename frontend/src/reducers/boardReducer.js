import { createSlice } from '@reduxjs/toolkit'
import { tryAmount, wordLength } from '../util/config'
import { setLocalWordleBoard } from '../util/localStorageHelper'

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

export const { letterPress, clearPress, enterPress, setBoard } = boardSlice.actions

export default boardSlice.reducer
