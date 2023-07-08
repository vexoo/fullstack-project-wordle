import { createSlice } from '@reduxjs/toolkit'
import { tryAmount, wordLength } from '../util/config'
import { joinWord } from '../util/helpers'
import { setLocalWordleBoard } from '../util/localStorageHelper'
import wordService from '../services/words'
import { setNotification } from './notificationReducer'
import { wordNotFoundNotification } from '../util/strings'
/*
		Note about enterEnabled:
		For some reason the keyboard listener in Key.js does not seem to properly ignore repeated Enter events.
		Console.logging the key in there would show 1 console message per (letter)keypress, and after pressing Enter or pressing a letter when the row is already full,
		console messages per keypress increase to 28 per keypress.

		Whether that's the cause of the issue I'm not sure, but what happens is that pressing Enter (on your own physical keyboard specifically, not clicking the on-screen one) 
		causes some sort of loop that fills the entire board with empty cells and then crashes.

		The three ways that I've found to stop it from happening are removing the await keyword from line 76 in this file, which then breaks the functionality of checking whether the word exists as
		then the function does not wait for the promise, or creating a state that prevents additional enter inputs which is what's currently implemented.
		The last idea I had would be to move the entire wordlist to client side, which to me is clearly the cleanest solution of the three, but it feels kind of weird to do in a fullstack project

		Whenever this project is reviewed, I'd much appreciate some insight as to why this is happening and how to prevent it properly. To reproduce: comment out lines 72, 77 and 79, 
		type a valid word and press enter, the application should crash
		*/
export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: Array.from({ length: tryAmount }, () => new Array(wordLength).fill('')),
    currentRow: 0,
    currentColumn: 0,
    enterEnabled: true
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
    },
    enableEnter(state, action) {
      state.enterEnabled = true
    },
    disableEnter(state, action) {
      state.enterEnabled = false
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
    const { board, currentColumn, currentRow, enterEnabled } = getState().board
    try {
      if (currentColumn === wordLength && enterEnabled) {
        dispatch(disableEnter())
        const word = joinWord(board[currentRow])
        const exists = await wordService.checkWord(word)
        if (exists) {
          dispatch(enterPress())
          dispatch(enableEnter())
        } else {
          dispatch(setNotification(wordNotFoundNotification, 3, true))
          dispatch(enableEnter())
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export default boardSlice.reducer
