import { createSlice } from '@reduxjs/toolkit'
import { tryAmount, wordLength } from '../util/config'
import { joinWord } from '../util/helpers'
import { setLocalWordleBoard } from '../util/localStorageHelper'
import wordService from '../services/words'
import { checkWord } from '../util/helpers'

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: Array.from({ length: tryAmount }, () => new Array(wordLength).fill('')),
    currentRow: 0,
    currentColumn: 0,
    /*
		Note about enterEnabled:
		For some reason the keyboard listener in Key.js does not seem to properly ignore repeated Enter events.
		Console.logging the key in there would show 1 console message per keypress, and after pressing Enter or pressing a letter when the row is already full,
		console messages per keypress increase to 28 per keypress.

		Whether that's the cause of the issue I'm not sure, but what happens is that pressing Enter (on your own physical keyboard specifically, not the on-screen one) 
		causes some sort of loop that fills the entire board and then crashes.

		The only two ways that I've found to stop it from happening are removing the await keyword from line 70 in this file, which then breaks the functionality of checking whether the word exists as
		then the function does not wait for the promise, or the second way of creating a state that prevents additional enter inputs which is what's currently implemented.

		Whenever this project is reviewed, I'd much appreciate some insight as to why this is happening and how to prevent it properly. To reproduce: comment out lines 72, 77 and 79, 
		type a valid word and press enter, the application should crash
		*/
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
    const { board, currentColumn, currentRow } = getState().board
    try {
      if (currentColumn === wordLength) {
        dispatch(disableEnter())
        const word = joinWord(board[currentRow])
        const exists = await wordService.checkWord(word)
        if (exists) {
          dispatch(enterPress())
          dispatch(enableEnter())
        } else {
          dispatch(enableEnter())
          console.log('word not found')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
}

/*
export const enterHandler = () => {
  return async (dispatch, getState) => {
    const { board, currentColumn, currentRow } = getState().board
    try {
      if (currentColumn === wordLength) {
        //dispatch(disableEnter())
        const word = joinWord(board[currentRow])
        //const exists = await wordService.checkWord(word)
        const exists = checkWord(word)
        if (exists) {
          dispatch(enterPress())
          // dispatch(enableEnter())
        } else {
          //dispatch(enableEnter())
          console.log('word not found')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
}
*/

export default boardSlice.reducer
