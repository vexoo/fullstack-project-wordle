import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { BoardContextProvider } from './contexts/BoardContext'
import { KeyBoardColorContextProvider } from './contexts/KeyboardColorContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BoardContextProvider>
      <KeyBoardColorContextProvider>
        <App />
      </KeyBoardColorContextProvider>
    </BoardContextProvider>
  </React.StrictMode>
)
