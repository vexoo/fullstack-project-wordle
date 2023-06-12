import { createContext, useState } from 'react'
import { currentState } from '../util/config'

const GameStateContext = createContext()

const GameStateContextProvider = ({ children }) => {
  const [gameState, setGameState] = useState(currentState.PLAYING)

  const changeGameState = (newState) => {
    setGameState(newState)
  }

  const contextValue = {
    gameState,
    changeGameState
  }

  return (
    <GameStateContext.Provider value={contextValue}>
      {children}
    </GameStateContext.Provider>
  )
}

export { GameStateContext, GameStateContextProvider }
