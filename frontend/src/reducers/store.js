import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './boardReducer'
import gameStateReducer from './gameStateReducer'
import userReducer from './userReducer'
import modalReducer from './modalReducer'

export default configureStore({
  reducer: {
    board: boardReducer,
    gameState: gameStateReducer,
    user: userReducer,
    modals: modalReducer
  }
})
