import { createContext, useState, useContext } from 'react'
import { currentState } from '../util/config'

const GameStateContext = createContext()

const GameStateContextProvider = ({ children }) => {
  const [gameState, setGameState] = useState(currentState.PLAYING)

  const isPlaying = () => gameState === currentState.PLAYING

  const setPlaying = () => setGameState(currentState.PLAYING)

  const hasWon = () => gameState === currentState.WON

  const setWon = () => setGameState(currentState.WON)

  const hasLost = () => gameState === currentState.LOST

  const setLost = () => setGameState(currentState.LOST)

  const contextValue = {
    gameState,
    isPlaying,
    setPlaying,
    hasWon,
    setWon,
    hasLost,
    setLost
  }

  return (
    <GameStateContext.Provider value={contextValue}>
      {children}
    </GameStateContext.Provider>
  )
}

export const useGameStateContext = () => {
  const gameState = useContext(GameStateContext)
  return gameState
}

export { GameStateContext, GameStateContextProvider }
