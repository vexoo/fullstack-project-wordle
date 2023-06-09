import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { BoardContextProvider } from './contexts/BoardContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BoardContextProvider>
      <App />
    </BoardContextProvider>
  </React.StrictMode>
)
