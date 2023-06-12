import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { BoardContextProvider } from './contexts/BoardContext'
import { KeyBoardColorContextProvider } from './contexts/KeyboardColorContext'
import { GameStateContextProvider } from './contexts/GameStateContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GameStateContextProvider>
      <BoardContextProvider>
        <KeyBoardColorContextProvider>
          <App />
        </KeyBoardColorContextProvider>
      </BoardContextProvider>
    </GameStateContextProvider>
  </React.StrictMode>
)
