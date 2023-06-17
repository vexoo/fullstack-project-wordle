import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './boardReducer'
import gameStateReducer from './gameStateReducer'

export default configureStore({
  reducer: {
    board: boardReducer,
    gameState: gameStateReducer
  }
})
